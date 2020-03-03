import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as echarts from 'echarts';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../service/communication.service'
import { DeviceService } from '../service/device.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription }   from 'rxjs';
import { LoadService } from '../service/load.service' 
import { EnergyService } from '../service/energy.service'
import { EnviromentService } from '../service/enviroment.service';

import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
interface ItemData { 
  costFrom: string;
  cost: string;
  incomeFrom: string;
  income: Number;
  profit: Number;
  carbonOut: Number;
}
interface ItemDataPDF {
  id: number;
  time1: string;
  needValue1: string;
  time2: string;
  needValue2: string;
  time3: string;
  needValue3: string;
} 

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  nowParamFormPDF: FormGroup; 
  listOfDataPDF: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataPDF2: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataPDF3: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataPDF4: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataPDF5: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  energyParamFormPDF: FormGroup; 
  energyParamForm2PDF: FormGroup;
  energyParamForm3PDF: FormGroup; 
  deviceParamFormPDF: FormGroup; 
  listOfDataWindSummerPDF: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataWindWinterPDF: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataSunSummerPDF: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];
  listOfDataSunWinterPDF: ItemDataPDF[] = [
    {
      id: 1,
      time1: '0-1时', 
      time2: '8-9时', 
      time3:  '16-17时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 2,
      time1: '1-2时', 
      time2: '9-10时', 
      time3:  '17-18时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 3,
      time1: '2-3时', 
      time2: '10-11时', 
      time3:  '18-19时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 4,
      time1: '3-4时', 
      time2: '11-12时', 
      time3:  '19-20时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 5,
      time1: '4-5时', 
      time2: '12-13时', 
      time3:  '20-21时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 6,
      time1: '5-6时', 
      time2: '13-14时', 
      time3:  '21-22时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 7,
      time1: '6-7时', 
      time2: '14-15时', 
      time3:  '22-23时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    },{
      id: 8,
      time1: '7-8时', 
      time2: '15-16时', 
      time3:  '23-24时', 
      needValue1: '',
      needValue2: '',
      needValue3: '',
    }
  ];

  resultForm: FormGroup; 
  optimizerGoal = '1'
  ifNeedNextStep: boolean = true;
  loadNext: boolean = false;
  queryParam = null; 
  alignType: string = 'center';
  listOfData: ItemData[] = [
    { 
      costFrom: '设备投资', 
      cost: null, 
      incomeFrom:  '售电', 
      income: null,
      profit: null , 
      carbonOut: null 
    },{ 
      costFrom: '设备运维', 
      cost: null, 
      incomeFrom:  '售蒸汽', 
      income: null,
      profit: null , 
      carbonOut: null 
    },{ 
      costFrom: '购电成本', 
      cost: null, 
      incomeFrom:  '售热水', 
      income: null,
      profit: null , 
      carbonOut: null 
    },{ 
      costFrom: '燃料成本', 
      cost: null, 
      incomeFrom:  '售冷', 
      income: null,
      profit: null , 
      carbonOut: null 
    },{ 
      costFrom: '-', 
      cost: '-', 
      incomeFrom:  '售暖', 
      income: null,
      profit: null , 
      carbonOut: null 
    },{ 
      costFrom: '', 
      cost: null, 
      incomeFrom:  '', 
      income: null,
      profit: null , 
      carbonOut: null 
    }
  ]
  echartBar = ["cchp","elec_boiler_heat","elec_boiler_heat"];

  flagLoad = false;
  flagRes = false;
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router ,
    public communication: CommunicationService,
    private Api: DeviceService,
    public activatedRoute: ActivatedRoute,
    private message: NzMessageService,
    // pdf
    private loadService: LoadService,
    private energyService :  EnergyService,
    private enviromentService :  EnviromentService,
  ) { 
    this.subscription = communication.missionAnnounced$.subscribe(
      mission => {
    });
  }

  toPDF(): void { 
    window.scroll(0,0);
    html2Canvas(document.getElementById('finalPDF'), {
      allowTaint: true,
      useCORS: true,
      width: document.getElementById('finalPDF').clientWidth + 300,
      height: document.getElementById('finalPDF').clientHeight + 200,
    }).then(canvas => {  
        let contentWidth = canvas.width;
        let contentHeight = canvas.height
 
        const pdf = new JsPDF('', 'pt', [contentWidth, contentHeight])
        const pageData = canvas.toDataURL('image/jpeg', 1.0) 
        pdf.addImage(pageData, 'JPEG', 150, 100, contentWidth, contentHeight)
        
        setTimeout(() => {
          pdf.save(`网页数据.pdf`)
        }, 500);
         
        // let pageHeight = contentWidth / 592.28 * 841.89
        // let leftHeight = contentHeight
        // let position = 0
        // let imgWidth = 595.28
        // let imgHeight = 592.28 / contentWidth * contentHeight
        // let pageData = canvas.toDataURL('image/jpeg', 1.0);
        // let PDF = new JsPDF('', 'pt', 'a4')
        // if (leftHeight < pageHeight) {
        //   PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        // } else {
        //   while (leftHeight > 0) {
        //     PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        //     leftHeight -= pageHeight
        //     position -= 841.89
        //     if (leftHeight > 0) {
        //       PDF.addPage()
        //     }
        //   }
        // } 
        // PDF.save('1.pdf')
    });  
  }

  // pdf
  refreshChartPDF(chart,type): void { 
    let chartData = [];
    let count = 0;
    let oldData = [];
    if(type == "electricity") oldData = this.listOfDataPDF; 
    if(type == "steam") oldData = this.listOfDataPDF2; 
    if(type == "heat") oldData = this.listOfDataPDF3; 
    if(type == "hotwater") oldData = this.listOfDataPDF4; 
    if(type == "cold") oldData = this.listOfDataPDF5; 
     
    oldData.map(item=>{  
      chartData.push([count,item.needValue1]);   
      chartData.push([count+8,item.needValue2]);  
      chartData.push([count+16,item.needValue3]); 

      count ++;
    })
    chartData.sort(function(x, y){
      return x[0]- y[0];
    });  
    this.initChartPDF(chart,chartData,'#02B980')
  }

  initChartPDF(chart,chartData,color): void {  
    if(chartData.length>0) chartData.push([chartData[23][0]+1,chartData[23][1]])
    let myChart = echarts.init(document.getElementById(chart)); 
    // 指定图表的配置项和数据
    let option = {
        color:[color],
        grid: {
          bottom: 40,
          left: 40,
          right: 50,
          top: 20
        }, 
        xAxis: {
            type: 'value',  
            minInterval: 1,
            splitLine: {
              show: false
            },
            axisLabel: {
                show: true,
                interval:0, 
            }, 
            scale:false, 
            maxInterval:1
        },
        yAxis: { 
            type: 'value',
            splitLine: {
              show: true,
              interval: 2,
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#F3F5F8'], 
              }
            },
            axisPointer:{
              show:true,
              snap :true
            }
        },
        series: [{
            step: 'end',
            data: chartData,
            type: 'line'
        }]
    }; 
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option,true); 
    setTimeout(()=>{
      myChart.resize();
    },200)
    window.onresize = function () {
      myChart.resize();
    }
  }

  initChart2PDF(chartData,color): void {  
    let chartDataP = JSON.parse(JSON.stringify(chartData))
    if(chartDataP.length>0) chartDataP.push([chartDataP[chartDataP.length-1][0]+1,chartDataP[chartDataP.length-1][1]])
    const myChart = echarts.init(document.getElementById('chart2PDF'));
    // 指定图表的配置项和数据
    let option = {
        color:[color], 
        grid: {
          bottom: 40,
          left: 40,
          right: 50,
          top: 20
        }, 
        xAxis: {
            type: 'value',  
            minInterval: 1,
            splitLine: {
              show: false
            },
            axisLabel: {
                show: true,
                interval:0, 
            }, 
            scale:false, 
            maxInterval:1
        },
        yAxis: {
            type: 'value',
            splitLine: {
              show: true,
              interval: 2,
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#F3F5F8'], 
              }
            },
            axisPointer:{
              show:true,
              snap :true
            } 
        },
        series: [{
            step: 'end',
            data: chartDataP,
            type: 'line'
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    setTimeout(()=>{
      myChart.resize();
    },200)
    window.onresize = function () {
      myChart.resize();
    }
  }

  changeWindDataPDF(seasonSpeed,chartName){
    let chartX = [], chartWindY = [], chartSunY = []
    setTimeout(()=>{
      if(seasonSpeed == "summerSpeed"){
        for(let i = 0; i < 3; i ++){
          for(let j = 0; j < this.listOfDataWindSummerPDF.length; j ++){
            if(i == 0){
              chartWindY.push(this.listOfDataWindSummerPDF[j]['needValue1'])
            }else if(i == 1){
              chartWindY.push(this.listOfDataWindSummerPDF[j]['needValue2'])
            }else if(i == 2){
              chartWindY.push(this.listOfDataWindSummerPDF[j]['needValue3'])
            }
          }
          for(let j = 0; j < this.listOfDataSunSummerPDF.length; j ++){
            if(i == 0){
              chartSunY.push(this.listOfDataSunSummerPDF[j]['needValue1'])
            }else if(i == 1){
              chartSunY.push(this.listOfDataSunSummerPDF[j]['needValue2'])
            }else if(i == 2){
              chartSunY.push(this.listOfDataSunSummerPDF[j]['needValue3'])
            }
          }
        }
      }else{
        for(let i = 0; i < 3; i ++){
          for(let j = 0; j < this.listOfDataWindWinterPDF.length; j ++){
            if(i == 0){
              chartWindY.push(this.listOfDataWindWinterPDF[j]['needValue1'])
            }else if(i == 1){
              chartWindY.push(this.listOfDataWindWinterPDF[j]['needValue2'])
            }else if(i == 2){
              chartWindY.push(this.listOfDataWindWinterPDF[j]['needValue3'])
            }
          }
          for(let j = 0; j < this.listOfDataSunWinterPDF.length; j ++){
            if(i == 0){
              chartSunY.push(this.listOfDataSunWinterPDF[j]['needValue1'])
            }else if(i == 1){
              chartSunY.push(this.listOfDataSunWinterPDF[j]['needValue2'])
            }else if(i == 2){
              chartSunY.push(this.listOfDataSunWinterPDF[j]['needValue3'])
            }
          }
        }
      }
      for(let i = 0; i < 24; i++){
        chartX.push(i)
      }
      this.initChartsPDF0(chartName,chartX, chartWindY, chartSunY)
    },500)
   
  } 

  initChartsPDF0(chartName,xData, windY, sunY) {
    const lineChart = echarts.init(document.getElementById(chartName));
    const lineChartOption = {
      grid: {
        bottom: 40,
        left: 40,
        right: 50,
        top: 30
      },

      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              animation: false,
              label: {
                  backgroundColor: '#505765'
              }
          }
      },
      legend: {
          data:[{name:'日时风速',icon: 'rect',},{name:'日辐射强度',icon: 'rect',}],
          x: 'center',
         
      },

      xAxis : [
          {
              type : 'category', 
              data : xData
          }
      ],
      yAxis: [
          {
            type: 'value',
            name: '日时风速(m/s)',
            splitLine:{  
              show:true,
              lineStyle:{
                color:'#F3F5F8',
                width: 1
              }
            }
          },
          {
              type: 'value',
              name: '日辐射强度(kw/㎡)',
          }
      ],
      series: [
          {
              name:'日时风速',
              type:'line',
              animation: false,
              color:'#35c799',
              symbol:'none',
              lineStyle: {
                  width: 2
              },
              data:windY
          },
          {
              name:'日辐射强度',
              type:'line',
              yAxisIndex:1,
              animation: false,
              color:'#0099ff',
              symbol:'none',
              lineStyle: {
                  width: 2
              },
              data: sunY
          }
      ]
    }
    lineChart.setOption(lineChartOption);
    setTimeout(()=>{
      lineChart.resize();
    },200)
    window.onresize = function () {
      lineChart.resize();
    }
  }
  // pdf结束

  doCalculate(): void {
    this.flagLoad = true;
    this.loadNext = true;

    let param = { projectId:this.queryParam.proId,data:[]}
    let result = []; 
    if(this.resultForm.value.optimizerGoal === '3'){ 
      result.push({equipmentName:'multi-objective',isCheck: true,param1:this.resultForm.value.economicWeight,
                  param2:this.resultForm.value.environmentalProtectionWeight,param3:null,order:25})
    }else if(this.resultForm.value.optimizerGoal === '1'){ 
      result.push({equipmentName:'economy',isCheck: true,param1:null,param2:null,param3:null,order:24})
    }else if(this.resultForm.value.optimizerGoal === '2'){ 
      result.push({equipmentName:'environment',isCheck: true,param1:null,param2:null,param3:null,order:26})
    } 
    param.data = result; 
    this.Api.updateEquipmentEquipment(param).subscribe(response => {  
      this.loadNext = false;
      if(response && response[200] && response[200] == "success"){
        
        // this.Api.calcresult({projectId:1}).subscribe(response => { 
          let result = response;
          if(result){
            let temp =[];
            for(let i  in result){
              // temp.push()
            }
   
            this.flagLoad = false;
            this.flagRes = true; 
      
            this.initChart([],'#02B980','chart');
            this.initPie([],'chartPie');
            this.initChart([],'#02B980','chartPDF');
            this.initPie([],'chartPiePDF');


            // pdf数据
            let PDFlocation = sessionStorage.getItem("PDFlocation"); 
            this.enviromentService.requestWeather(PDFlocation).subscribe(response => { 
              let result : any = [];
              result = response; 

              let obj = {} 
              for(let i = 0; i < result.length; i++){
                obj[result[i]['order']] = result[i]
              }
              for(let i = 0; i < this.listOfDataWindSummerPDF.length; i++){
                this.listOfDataWindSummerPDF[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['summerSpeed']==undefined?"":obj[i+1]['summerSpeed']))
                this.listOfDataWindSummerPDF[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['summerSpeed']==undefined?"":obj[i+9]['summerSpeed']))
                this.listOfDataWindSummerPDF[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['summerSpeed']==undefined?"":obj[i+17]['summerSpeed']))

                this.listOfDataWindWinterPDF[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['winterSpeed']==undefined?"":obj[i+1]['winterSpeed']))
                this.listOfDataWindWinterPDF[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['winterSpeed']==undefined?"":obj[i+9]['winterSpeed']))
                this.listOfDataWindWinterPDF[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['winterSpeed']==undefined?"":obj[i+17]['winterSpeed']))

                this.listOfDataSunSummerPDF[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['summerRad']==undefined?"":obj[i+1]['summerRad']))
                this.listOfDataSunSummerPDF[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['summerRad']==undefined?"":obj[i+9]['summerRad']))
                this.listOfDataSunSummerPDF[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['summerRad']==undefined?"":obj[i+17]['summerRad']))

                this.listOfDataSunWinterPDF[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['winterRad']==undefined?"":obj[i+1]['winterRad']))
                this.listOfDataSunWinterPDF[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['winterRad']==undefined?"":obj[i+9]['winterRad']))
                this.listOfDataSunWinterPDF[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['winterRad']==undefined?"":obj[i+17]['winterRad']))
              }
              this.changeWindDataPDF("summerSpeed", "summerRadChart")
              this.changeWindDataPDF("winterSpeed", "winterRadChart") 
            })
            this.loadService.getLoadInfo(this.queryParam.proId).subscribe(response => { 
              let result = response; 
              if(result && result[0]){
                for(let i=0;i<8;i++){
                  this.listOfDataPDF[i].needValue1 = result[i]['electricity'];  
                  this.listOfDataPDF[i].needValue2 = result[i+8]['electricity'];  
                  this.listOfDataPDF[i].needValue3 = result[i+16]['electricity']; 
        
                  this.listOfDataPDF2[i].needValue1 = result[i]['steam'];  
                  this.listOfDataPDF2[i].needValue2 = result[i+8]['steam'];  
                  this.listOfDataPDF2[i].needValue3 = result[i+16]['steam']; 
        
                  this.listOfDataPDF3[i].needValue1 = result[i]['heat'];  
                  this.listOfDataPDF3[i].needValue2 = result[i+8]['heat'];  
                  this.listOfDataPDF3[i].needValue3 = result[i+16]['heat']; 
        
                  this.listOfDataPDF4[i].needValue1 = result[i]['hotwater'];  
                  this.listOfDataPDF4[i].needValue2 = result[i+8]['hotwater'];  
                  this.listOfDataPDF4[i].needValue3 = result[i+16]['hotwater']; 
        
                  this.listOfDataPDF5[i].needValue1 = result[i]['cold'];  
                  this.listOfDataPDF5[i].needValue2 = result[i+8]['cold'];  
                  this.listOfDataPDF5[i].needValue3 = result[i+16]['cold']; 
                } 
         
                this.refreshChartPDF("electricitychart",'electricity');
                this.refreshChartPDF("steamchart",'steam');
                this.refreshChartPDF("heatchart",'heat');
                this.refreshChartPDF("hotwaterchart",'hotwater');
                this.refreshChartPDF("coldchart",'cold');
                // 负荷现状
                this.nowParamFormPDF= this.fb.group({ 
                  electricity: [result[24].electricity],
                  steam: [result[24].steam], 
                  heat: [result[24].heat],
                  hotwater: [result[24].hotwater], 
                  cold: [result[24].cold]
                });
              } 
            })  
            this.energyService.getEnergyInfo({projectId:this.queryParam.proId}).subscribe(response => { 
              let result = response; 
              if(result && result[0] && result[12]){  
                let chartData = [];
                for(let i in result){ 
                  if(result[i].attrName == 'peak')  this.energyParamFormPDF.patchValue({peak:result[i].attrValue})  
                  else if(result[i].attrName == 'off-peak')  this.energyParamFormPDF.patchValue({'off-peak':result[i].attrValue})  
                  else if(result[i].attrName == 'shoulder')  this.energyParamFormPDF.patchValue({shoulder:result[i].attrValue})   
                  else if(result[i].attrName == 'sale_elec')  this.energyParamFormPDF.patchValue({sale_elec:result[i].attrValue})  
        
                  else if(result[i].attrName == 'cold')  this.energyParamForm2PDF.patchValue({cold:result[i].attrValue})  
                  else if(result[i].attrName == 'hotwater')  this.energyParamForm2PDF.patchValue({hotwater:result[i].attrValue})
                  else if(result[i].attrName == 'stream')  this.energyParamForm2PDF.patchValue({stream:result[i].attrValue})
                  else if(result[i].attrName == 'heat')  this.energyParamForm2PDF.patchValue({heat:result[i].attrValue})
        
                  else if(result[i].attrName == 'coal')  this.energyParamForm3PDF.patchValue({coal:result[i].attrValue})  
                  else if(result[i].attrName == 'gas')  this.energyParamForm3PDF.patchValue({gas:result[i].attrValue})
                  else if(result[i].attrName == 'biofuel')  this.energyParamForm3PDF.patchValue({biofuel:result[i].attrValue})
                  else if(result[i].attrName == 'oil')  this.energyParamForm3PDF.patchValue({oil:result[i].attrValue})
                  else{
                    // 时间
                    chartData.push([Number(result[i].attrName),result[i].attrValue])
                  }
                }
                chartData.sort(function(x, y){ 
                  return x[0]- y[0]; 
                });    
                
                // 显示图
                this.initChart2PDF(chartData,'#02B980')  
              }   
            }) 
            this.Api.getDeviceInfo({projectId:this.queryParam.proId}).subscribe(response => { 
              let result = response; 
              if(result && result[0]){ 
                let arr = [];
                for(let i in result){
                  arr.push({name:result[i].equipmentName+'isCheck',value:result[i].isCheck})
                  arr.push({name:result[i].equipmentName+'param1',value:result[i].param1}) 
                  arr.push({name:result[i].equipmentName+'param2',value:result[i].param2})
                  arr.push({name:result[i].equipmentName+'param3',value:result[i].param3})  
                } 
                arr.map(item=>{ 
                  this.deviceParamFormPDF.patchValue({[item.name]:item.value})
                }) 
                  
                this.deviceParamFormPDF.patchValue({isCheckBiomass:this.deviceParamFormPDF.value.bio_boiler_steamisCheck||this.deviceParamFormPDF.value.bio_boiler_heatisCheck})
                this.deviceParamFormPDF.patchValue({isCheckElectric:this.deviceParamFormPDF.value.elec_boiler_steamisCheck||this.deviceParamFormPDF.value.elec_boiler_heatisCheck})
                this.deviceParamFormPDF.patchValue({isCheckCoal:this.deviceParamFormPDF.value.coal_boiler_steamisCheck||this.deviceParamFormPDF.value.coal_boiler_heatisCheck})
                this.deviceParamFormPDF.patchValue({isCheckGas:this.deviceParamFormPDF.value.gas_boiler_steamisCheck||this.deviceParamFormPDF.value.gas_boiler_heatisCheck})
                this.deviceParamFormPDF.patchValue({isCheckWaterPump:this.deviceParamFormPDF.value.hp_water_heatisCheck||this.deviceParamFormPDF.value.hp_water_coldisCheck})
                this.deviceParamFormPDF.patchValue({isCheckGroundPump:this.deviceParamFormPDF.value.hp_ground_heatisCheck||this.deviceParamFormPDF.value.hp_water_coldisCheck})    
                this.deviceParamFormPDF.patchValue({isCheckAirPump:this.deviceParamFormPDF.value.hp_air_heatisCheck||this.deviceParamFormPDF.value.hp_air_coldisCheck})       
               
              } 
            }) 
            // pdf数据结束
          } 
        // })  
      }  
    })  
  }

  initChart(chartData,color,divName): void {
    const myChart = echarts.init(document.getElementById(divName));
    // 指定图表的配置项和数据
    let option = {
        color:[color],
        grid: {
          bottom: 40,
          left: 80,
          right: 80,
          top: 40
        }, 
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
            type: 'value',  
            minInterval: 1,
            splitLine: {
              show: false
            },
            axisLabel: {
                show: true,
                interval:0, 
            }, 
        },
        yAxis: {
            type: 'value',
            name: '单位：MW',
            splitLine: {
              show: false
            }
        },
        series: [{
            data: chartData,
            type: 'line'
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    setTimeout(()=>{
      myChart.resize();
    },200)
    window.onresize = function () {
      myChart.resize();
    }
  }

  initPie(chartData,divName): void {
    const myChartPie = echarts.init(document.getElementById(divName));
    chartData = [
      {value:335, name:'直接访问'},
      {value:310, name:'邮件营销'},
      {value:234, name:'联盟广告'},
      {value:135, name:'视频广告'}, 
    ] 
    // 指定图表的配置项和数据
    let option = {
        color:['#02B980','#3aa1ff','#fbd437','#f2637b'],
        tooltip: {
          trigger: 'item',
          formatter: "{b} : {c} ({d}%)"
        }, 
        legend: {
          orient: 'vertical',
          right: '10%',
          top:'20%',
          itemGap: 15,
          formatter: function(name){
            let text;
            let totalValue = 0;
            let nowValue;
            chartData.map(item=>{
              if(item.name == name){
                nowValue = item.value;
                text = `${name}   ${item.value}t`;
              }
              totalValue += item.value;
            })
            text += `   ${((nowValue/totalValue)*100).toFixed(2)}%`
            
            return text
          }, 
        },
        series: [{
          data:chartData,
          label:{
            show:true,
            formatter: '{b}: {d}%'
          },
          radius : '55%',
          center: ['30%', '50%'],
          type: 'pie'
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChartPie.setOption(option);
    setTimeout(()=>{
      myChartPie.resize();
    },200)
    window.onresize = function () {
      myChartPie.resize();
    }
  }

  initGoal(): void {
    this.Api.getDeviceInfo({projectId:this.queryParam.proId}).subscribe(response => { 
      let result = response; 
      if(result){   
        for(let i in result){ 
          if(result[i].equipmentName === "economy" && result[i].isCheck === true) this.optimizerGoal = '1'; 
          if(result[i].equipmentName === "environment" && result[i].isCheck === true) this.optimizerGoal = '2';
          if(result[i].equipmentName === "multi-objective" && result[i].isCheck === true){
            this.optimizerGoal = '3';
            this.resultForm.patchValue({economicWeight:result[i].param1})    
            this.resultForm.patchValue({environmentalProtectionWeight:result[i].param2})
          } 
        } 
      } 
    }) 
  }

  ngOnInit() { 
    sessionStorage.setItem("localPage", "result")
    this.activatedRoute.queryParams.subscribe(queryParam => {
      if(queryParam == {} || queryParam.create ==undefined){
        this.router.navigate(['/'])  
      }
  
      this.queryParam = queryParam; 
    });
    let isdisabled = (this.queryParam.edit == "true" ? true:false) || (this.queryParam.create == "true" ? true:false) 

    this.resultForm = this.fb.group({ 
      environmentalProtectionWeight:[{value:null,disabled:!isdisabled}],
      economicWeight:[{value:null,disabled:!isdisabled}],
      optimizerGoal: [{value:'1',disabled:!isdisabled}],
    })
 
    this.initGoal(); 

    // pdf
    this.nowParamFormPDF = this.fb.group({ 
      electricity: null,
      steam:  null,
      heat: null,
      hotwater:  null,
      cold: null,
    });
    this.energyParamFormPDF = this.fb.group({ 
      peak: 0,
      shoulder: 0,
      ['off-peak']:0,
      sale_elec: 0,
    });
    this.energyParamForm2PDF = this.fb.group({  
      cold: 0, 
      hotwater:0,
      stream :0,
      heat : 0,
    });
    this.energyParamForm3PDF = this.fb.group({  
      coal:0, 
      gas: 0,
      biofuel:0,
      oil:0,
    });
    this.deviceParamFormPDF = this.fb.group({ 
      cchpisCheck: true,
      chpisCheck: true,
      isCheckBiomass:true,
      isCheckCoal:true,
      isCheckElectric:true,
      isCheckGas:true,  
      bio_boiler_steamisCheck: true,
      bio_boiler_heatisCheck: true,
      elec_boiler_steamisCheck: true,
      elec_boiler_heatisCheck: true,
      coal_boiler_steamisCheck: true,
      coal_boiler_heatisCheck: true,
      gas_boiler_steamisCheck: true,
      gas_boiler_heatisCheck: true,
      heat_exchangerisCheck: true,
      pvisCheck: true, 
      cchpparam1: null,
      cchpparam2: null,
      cchpparam3: null, 
      chpparam1: null,
      chpparam2: null, 
      bio_boiler_steamparam1: null,
      bio_boiler_heatparam1: null, 
      elec_boiler_steamparam1: null,
      elec_boiler_heatparam1: null, 
      coal_boiler_steamparam1: null,
      coal_boiler_heatparam1: null,
      gas_boiler_steamparam1: null,
      gas_boiler_heatparam1: null,
      heat_exchangerparam1: null,
      pvparam1: null, 

      isCheckWaterPump:true,
      isCheckAirPump:true,
      isCheckGroundPump:true, 
      hp_water_heatisCheck: true,
      hp_water_coldisCheck: true,
      hp_ground_heatisCheck: true,
      hp_ground_coldisCheck: true,
      hp_air_heatisCheck: true,
      hp_air_coldisCheck: true,
      elec_coldisCheck: true,
      libr_coldisCheck: true,
      wind_elecisCheck: true,   
      hp_water_heatparam1: null,
      hp_water_coldparam1: null,
      hp_ground_heatparam1: null,
      hp_ground_coldparam1: null,
      hp_air_heatparam1: null,
      hp_air_coldparam1: null,
      elec_coldparam1: null,
      libr_coldparam1: null,
      wind_elecparam1: null,
      wind_elecparam2: null, 
      elec_stoisCheck: null, 
      hotwater_stoisCheck: null, 
    });
  }

  ngAfterViewInit(): void {
    
  }
  previousStep(): void{ 
    this.router.navigate(['/device'], { 
      queryParams: this.queryParam
    }) 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
