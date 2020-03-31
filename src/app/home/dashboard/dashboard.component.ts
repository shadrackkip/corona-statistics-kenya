import { Component, OnInit } from '@angular/core';
import {CoronaService} from "../../services/corona.service";
import * as moment from 'moment';

interface Corona {
  stat_by_country:any,
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  coronaDate=[];
  stats=[];
  activeCases=[];

  coronaHistory=[];
  daughnutChartDt=[];



  constructor(private coronService: CoronaService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = this.coronaDate;
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: this.stats, label: 'Confirmed Cases'},
    {data: this.activeCases, label: 'Active Cases'}
  ];

  //doughnut chart

  public doughnutChartLabels = ['Active cases', 'Confirmed cases', 'Recovered','Seriously critical', 'Deaths'];
  public doughnutChartData=[0,0,0,0,0];

  public doughnutChartType = 'doughnut';
  //end of


  public pieChartLabels = ['Active cases', 'Confirmed cases', 'Recovered','Seriously critical', 'Deaths'];
  public pieChartData = [0,0,0,0,0];
  public pieChartType = 'pie';

  ngOnInit(): void
  {
    this.coronService.getCorona().subscribe(<Corona>(resp)=>{
      this.coronaHistory.push( resp.stat_by_country);

      resp.stat_by_country.forEach((item,i)=>{
      let formattedDate =  moment(item.record_date).format('ll');
      if(!this.coronaDate.includes(formattedDate)){
        this.coronaDate.push(formattedDate);
        this.stats.push(item.total_cases);
        this.activeCases.push(item.active_cases)
      }



      // if(!this.confirmedCasesNo.includes(item))

      });
     let lastObjIndex=resp.stat_by_country.length-1;
      this.daughnutChartDt.push(resp.stat_by_country[lastObjIndex])
      console.log(this.daughnutChartDt)
     this.doughnutChartData= [this.daughnutChartDt[0].active_cases, this.daughnutChartDt[0].total_cases, this.daughnutChartDt[0].total_recovered,this.daughnutChartDt[0].serious_critical, this.daughnutChartDt[0].total_deaths];
     this.pieChartData= [this.daughnutChartDt[0].active_cases, this.daughnutChartDt[0].total_cases, this.daughnutChartDt[0].total_recovered,this.daughnutChartDt[0].serious_critical, this.daughnutChartDt[0].total_deaths];


    })


  }

}
