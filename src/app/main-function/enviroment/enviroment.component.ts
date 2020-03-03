import { Component, ElementRef, HostListener, OnInit, ViewChild, Input, OnDestroy  } from '@angular/core';
import * as echarts from 'echarts';
import { EnviromentService } from '../service/enviroment.service';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../service/communication.service';
import { Subscription }   from 'rxjs';
import { UploadXHRArgs } from 'ng-zorro-antd/upload';
import * as XLSX from 'xlsx'; 
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

interface ItemData {
  id: number;
  time1: string;
  needValue1: string;
  time2: string;
  needValue2: string;
  time3: string;
  needValue3: string;
}
declare let BMap: any;
@Component({
  selector: 'app-enviroment',
  templateUrl: './enviroment.component.html',
  styleUrls: ['./enviroment.component.scss'],
})

export class EnviromentComponent implements OnInit {
  map: any;
  site: any = "";
  local: any;
  summer: boolean = true;
  queryData: any = []
  windData: any = [];
  sunData: any = [];
  chartX: any = [];
  chartSunY: any = [];
  chartWindY: any = []; 
  queryParam = null;
  pageState: any = {};
  ifshowWind: boolean = false
  ifshowSun: boolean = false
  cityList: any = []
  ifShowCityList :boolean = false;

  proId = null;
  isEdit = false;
  create = false;
  editId: string | null;
  location: string = 'wuxi';
  ifNeedNextStep: boolean = true;
  listOfDataWindSummer: ItemData[] = [
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
  listOfDataWindWinter: ItemData[] = [
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
  listOfDataSunSummer: ItemData[] = [
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
  listOfDataSunWinter: ItemData[] = [
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
  toSaveListData: any ;

  subscription: Subscription;

  constructor(
    public query: EnviromentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public communication: CommunicationService,
  ) { 

    this.subscription = communication.missionAnnounced$.subscribe(
      mission => {
        this.ifNeedNextStep = false
        this.saveAnextStep()
    });
  }
  ngOnInit() {
    sessionStorage.setItem("localPage", "enviroment")
    this.pageState = JSON.parse(sessionStorage.getItem('pageState'))
    this.activatedRoute.queryParams.subscribe(queryParam => { 
      this.queryParam = queryParam; 
      this.proId = queryParam.proId
      this.isEdit = queryParam.edit == "true" ? true:false;
      this.create = queryParam.create == "true" ? true:false;
      if(queryParam.location){
        this.location = queryParam.location

        sessionStorage.setItem("PDFlocation", this.location)
      }
    });

    this.map= new BMap.Map("map", {enableMapClick:false,minZoom:5,maxZoom:19});
    this.map.enableScrollWheelZoom(true);
    this.query.requestWeather(this.location).subscribe(response => {
      let place = "无锡"
      if(this.create){
        place = "无锡"
      }else{
        place = response[0]['name']
        if(response[0]['name'] == ""){
          place = "无锡"
        }
      }
      this.map.centerAndZoom(place, 15);
      this.queryData = response
      this.toggleTableData()
      this.changeWindData("summerSpeed", "summerRad")
    })
    this.query.requestCity().subscribe(response => {
      this.cityList = response
    })
  }

  search(){
    this.map.clearOverlays();
		if(this.site != ""){
      let zoomLevel = this.map.getZoom()
      this.map.centerAndZoom(this.site,zoomLevel);  
      this.query.requestWeather(this.site).subscribe(response => {
        this.location = response[0]['location']
        this.queryData = response
        this.summer = true
        this.toggleTableData()
        this.changeWindData("summerSpeed", "summerRad")
      })
		}
  }
  showPlace(){
    this.ifShowCityList = true
  }
  hidePlace(){
    setTimeout(()=>{
      this.ifShowCityList = false
    },400)
  }
  chooseCity(data){
    this.site = data
    this.hidePlace()
  }
  initCharts(xData, windY, sunY) {
    const lineChart = echarts.init(document.getElementById('lineChart'));
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
  queryPageData(type){
    if(type == 1){
      this.summer = true
      this.changeWindData("summerSpeed", "summerRad")
    }else{
      this.summer = false
      this.changeWindData("winterSpeed", "winterRad")
    }
    
  }

  
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if ( this.editId ) { 
      let className : any = (e.target as any).className;
      if( className instanceof String && className.indexOf('tableInput') == -1 ){
        this.editId = null;
      } 
    }
  }

  startEdit(id: string, event: MouseEvent): void {
    if( this.isEdit || this.create ){
      event.preventDefault();
      event.stopPropagation();
      this.editId = id;
    } 
  }
  toggleTableData(){
    let obj = {}
    for(let i = 0; i < this.queryData.length; i++){
      obj[this.queryData[i]['order']] = this.queryData[i]
    }
    for(let i = 0; i < this.listOfDataWindSummer.length; i++){
      this.listOfDataWindSummer[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['summerSpeed']==undefined?"":obj[i+1]['summerSpeed']))
      this.listOfDataWindSummer[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['summerSpeed']==undefined?"":obj[i+9]['summerSpeed']))
      this.listOfDataWindSummer[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['summerSpeed']==undefined?"":obj[i+17]['summerSpeed']))

      this.listOfDataWindWinter[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['winterSpeed']==undefined?"":obj[i+1]['winterSpeed']))
      this.listOfDataWindWinter[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['winterSpeed']==undefined?"":obj[i+9]['winterSpeed']))
      this.listOfDataWindWinter[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['winterSpeed']==undefined?"":obj[i+17]['winterSpeed']))

      this.listOfDataSunSummer[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['summerRad']==undefined?"":obj[i+1]['summerRad']))
      this.listOfDataSunSummer[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['summerRad']==undefined?"":obj[i+9]['summerRad']))
      this.listOfDataSunSummer[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['summerRad']==undefined?"":obj[i+17]['summerRad']))

      this.listOfDataSunWinter[i]['needValue1'] = (obj[i+1]==undefined?"": (obj[i+1]['winterRad']==undefined?"":obj[i+1]['winterRad']))
      this.listOfDataSunWinter[i]['needValue2'] = (obj[i+9]==undefined?"": (obj[i+9]['winterRad']==undefined?"":obj[i+9]['winterRad']))
      this.listOfDataSunWinter[i]['needValue3'] = (obj[i+17]==undefined?"": (obj[i+17]['winterRad']==undefined?"":obj[i+17]['winterRad']))
    }
  }
  changeWindData(seasonSpeed, seasonRad){
    this.chartX = [], this.chartWindY = [], this.chartSunY = []
    setTimeout(()=>{
      if(seasonSpeed == "summerSpeed"){
        for(let i = 0; i < 3; i ++){
          for(let j = 0; j < this.listOfDataWindSummer.length; j ++){
            if(i == 0){
              this.chartWindY.push(this.listOfDataWindSummer[j]['needValue1'])
            }else if(i == 1){
              this.chartWindY.push(this.listOfDataWindSummer[j]['needValue2'])
            }else if(i == 2){
              this.chartWindY.push(this.listOfDataWindSummer[j]['needValue3'])
            }
          }
          for(let j = 0; j < this.listOfDataSunSummer.length; j ++){
            if(i == 0){
              this.chartSunY.push(this.listOfDataSunSummer[j]['needValue1'])
            }else if(i == 1){
              this.chartSunY.push(this.listOfDataSunSummer[j]['needValue2'])
            }else if(i == 2){
              this.chartSunY.push(this.listOfDataSunSummer[j]['needValue3'])
            }
          }
        }
      }else{
        for(let i = 0; i < 3; i ++){
          for(let j = 0; j < this.listOfDataWindWinter.length; j ++){
            if(i == 0){
              this.chartWindY.push(this.listOfDataWindWinter[j]['needValue1'])
            }else if(i == 1){
              this.chartWindY.push(this.listOfDataWindWinter[j]['needValue2'])
            }else if(i == 2){
              this.chartWindY.push(this.listOfDataWindWinter[j]['needValue3'])
            }
          }
          for(let j = 0; j < this.listOfDataSunWinter.length; j ++){
            if(i == 0){
              this.chartSunY.push(this.listOfDataSunWinter[j]['needValue1'])
            }else if(i == 1){
              this.chartSunY.push(this.listOfDataSunWinter[j]['needValue2'])
            }else if(i == 2){
              this.chartSunY.push(this.listOfDataSunWinter[j]['needValue3'])
            }
          }
        }
      }
      for(let i = 0; i < 24; i++){
        this.chartX.push(i)
      }
      this.initCharts(this.chartX, this.chartWindY, this.chartSunY)
    },500)
   
  }
  refreshChart(){
    this.initCharts(this.chartX, this.chartWindY, this.chartSunY)
  }
  saveAnextStep(): void {
    this.toSaveListData = {
      projectId:this.proId,
      location:this.location,
      weathers:[
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[0]['needValue1'],"winterRad":this.listOfDataSunWinter[0]['needValue1'],"summerSpeed":this.listOfDataWindSummer[0]['needValue1'],"summerRad":this.listOfDataSunSummer[0]['needValue1'],"order":1},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[1]['needValue1'],"winterRad":this.listOfDataSunWinter[1]['needValue1'],"summerSpeed":this.listOfDataWindSummer[1]['needValue1'],"summerRad":this.listOfDataSunSummer[1]['needValue1'],"order":2},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[2]['needValue1'],"winterRad":this.listOfDataSunWinter[2]['needValue1'],"summerSpeed":this.listOfDataWindSummer[2]['needValue1'],"summerRad":this.listOfDataSunSummer[2]['needValue1'],"order":3},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[3]['needValue1'],"winterRad":this.listOfDataSunWinter[3]['needValue1'],"summerSpeed":this.listOfDataWindSummer[3]['needValue1'],"summerRad":this.listOfDataSunSummer[3]['needValue1'],"order":4},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[4]['needValue1'],"winterRad":this.listOfDataSunWinter[4]['needValue1'],"summerSpeed":this.listOfDataWindSummer[4]['needValue1'],"summerRad":this.listOfDataSunSummer[4]['needValue1'],"order":5},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[5]['needValue1'],"winterRad":this.listOfDataSunWinter[5]['needValue1'],"summerSpeed":this.listOfDataWindSummer[5]['needValue1'],"summerRad":this.listOfDataSunSummer[5]['needValue1'],"order":6},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[6]['needValue1'],"winterRad":this.listOfDataSunWinter[6]['needValue1'],"summerSpeed":this.listOfDataWindSummer[6]['needValue1'],"summerRad":this.listOfDataSunSummer[6]['needValue1'],"order":7},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[7]['needValue1'],"winterRad":this.listOfDataSunWinter[7]['needValue1'],"summerSpeed":this.listOfDataWindSummer[7]['needValue1'],"summerRad":this.listOfDataSunSummer[7]['needValue1'],"order":8},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[0]['needValue2'],"winterRad":this.listOfDataSunWinter[0]['needValue2'],"summerSpeed":this.listOfDataWindSummer[0]['needValue2'],"summerRad":this.listOfDataSunSummer[0]['needValue2'],"order":9},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[1]['needValue2'],"winterRad":this.listOfDataSunWinter[1]['needValue2'],"summerSpeed":this.listOfDataWindSummer[1]['needValue2'],"summerRad":this.listOfDataSunSummer[1]['needValue2'],"order":10},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[2]['needValue2'],"winterRad":this.listOfDataSunWinter[2]['needValue2'],"summerSpeed":this.listOfDataWindSummer[2]['needValue2'],"summerRad":this.listOfDataSunSummer[2]['needValue2'],"order":11},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[3]['needValue2'],"winterRad":this.listOfDataSunWinter[3]['needValue2'],"summerSpeed":this.listOfDataWindSummer[3]['needValue2'],"summerRad":this.listOfDataSunSummer[3]['needValue2'],"order":12},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[4]['needValue2'],"winterRad":this.listOfDataSunWinter[4]['needValue2'],"summerSpeed":this.listOfDataWindSummer[4]['needValue2'],"summerRad":this.listOfDataSunSummer[4]['needValue2'],"order":13},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[5]['needValue2'],"winterRad":this.listOfDataSunWinter[5]['needValue2'],"summerSpeed":this.listOfDataWindSummer[5]['needValue2'],"summerRad":this.listOfDataSunSummer[5]['needValue2'],"order":14},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[6]['needValue2'],"winterRad":this.listOfDataSunWinter[6]['needValue2'],"summerSpeed":this.listOfDataWindSummer[6]['needValue2'],"summerRad":this.listOfDataSunSummer[6]['needValue2'],"order":15},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[7]['needValue2'],"winterRad":this.listOfDataSunWinter[7]['needValue2'],"summerSpeed":this.listOfDataWindSummer[7]['needValue2'],"summerRad":this.listOfDataSunSummer[7]['needValue2'],"order":16},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[0]['needValue3'],"winterRad":this.listOfDataSunWinter[0]['needValue3'],"summerSpeed":this.listOfDataWindSummer[0]['needValue3'],"summerRad":this.listOfDataSunSummer[0]['needValue3'],"order":17},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[1]['needValue3'],"winterRad":this.listOfDataSunWinter[1]['needValue3'],"summerSpeed":this.listOfDataWindSummer[1]['needValue3'],"summerRad":this.listOfDataSunSummer[1]['needValue3'],"order":18},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[2]['needValue3'],"winterRad":this.listOfDataSunWinter[2]['needValue3'],"summerSpeed":this.listOfDataWindSummer[2]['needValue3'],"summerRad":this.listOfDataSunSummer[2]['needValue3'],"order":19},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[3]['needValue3'],"winterRad":this.listOfDataSunWinter[3]['needValue3'],"summerSpeed":this.listOfDataWindSummer[3]['needValue3'],"summerRad":this.listOfDataSunSummer[3]['needValue3'],"order":20},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[4]['needValue3'],"winterRad":this.listOfDataSunWinter[4]['needValue3'],"summerSpeed":this.listOfDataWindSummer[4]['needValue3'],"summerRad":this.listOfDataSunSummer[4]['needValue3'],"order":21},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[5]['needValue3'],"winterRad":this.listOfDataSunWinter[5]['needValue3'],"summerSpeed":this.listOfDataWindSummer[5]['needValue3'],"summerRad":this.listOfDataSunSummer[5]['needValue3'],"order":22},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[6]['needValue3'],"winterRad":this.listOfDataSunWinter[6]['needValue3'],"summerSpeed":this.listOfDataWindSummer[6]['needValue3'],"summerRad":this.listOfDataSunSummer[6]['needValue3'],"order":23},
        {"name":this.site,"winterSpeed":this.listOfDataWindWinter[7]['needValue3'],"winterRad":this.listOfDataSunWinter[7]['needValue3'],"summerSpeed":this.listOfDataWindSummer[7]['needValue3'],"summerRad":this.listOfDataSunSummer[7]['needValue3'],"order":24},
      ]
    }
    if(this.create || this.isEdit){
      this.query.saveToDataBase(this.toSaveListData).subscribe((response)=>{
        if(response && response[200] && response[200] == "success"){
          if(this.ifNeedNextStep){
            this.communication.confirmMission("load#1");
          }
        }
      })
    }else{
      if(this.ifNeedNextStep){
        this.communication.confirmMission("load#1");
      }
    }
    
  }
  showWind(type){
    this.ifshowWind = type
  }
  showSun(type){
    this.ifshowSun = type
  }
  customReq = (item: UploadXHRArgs) => { 
    const formData = new FormData(); 
    formData.append('sourceFile', item.file as any);
    formData.append('dataSource', 'weather');
 
    return this.query.uploadExcel(formData).subscribe( 
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) { 
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
        this.query.requestWeather('无锡').subscribe(response => {
          this.queryData = response
          this.toggleTableData()
          this.changeWindData("summerSpeed", "summerRad")
        
        })
      },
      err => {
        console.log("error")
        item.onError!(err, item.file!);
        this.query.requestWeather('无锡').subscribe(response => {
          this.queryData = response
          this.toggleTableData()
          this.changeWindData("summerSpeed", "summerRad")
        
        })
      }
    );
  };
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  updateSeason(type){
    if(type == "summer"){
      this.changeWindData("summerSpeed", "summerRad")
    }else{
      this.changeWindData("winterSpeed", "winterRad")
    } 
  }
}
