import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms'; 
import * as echarts from 'echarts';
import { Router,ActivatedRoute } from '@angular/router';
import { EnergyService } from '../service/energy.service'
import { CommunicationService } from '../../service/communication.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription }   from 'rxjs';
@Component({
  selector: 'app-energy',
  templateUrl: './energy.component.html',
  styleUrls: ['./energy.component.scss'],
})
export class EnergyComponent implements OnInit {
  energyParamForm: FormGroup; 
  energyParamForm2: FormGroup;
  energyParamForm3: FormGroup;
  isVisible = false;
  timeChoose = []; 
  topCount = [{count:1,name:'selectedTopTime1',name2:'selectedTop2Time1'}];
  lowCount = [{count:1,name:'selectedLowTime1',name2:'selectedLow2Time1'}]; 
  pinCount = [{count:1,name:'selectedPinTime1',name2:'selectedPin2Time1'}]; 
  queryParam = null;
  pageState: any = {}
  ifNeedNextStep: boolean = true;
  threeTypeTimes = [] 
  loadNext = false
  subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private Api :  EnergyService,
    public communication: CommunicationService,
    private message: NzMessageService,
  ) {
    this.subscription = communication.missionAnnounced$.subscribe(
      mission => {
        this.ifNeedNextStep = false
        this.saveAnextStep()
    });
   }
  
  refreshChart(): void {
    let chartData = [];
    this.topCount.map(item=>{
      if(item.name && item.name !== 'selectedTopTime1' && item.name2 && item.name2 !== 'selectedTop2Time1'){
        let start = Number(item.name.substring(0,2));
        let end = Number(item.name2.substring(0,2)); 
        for(let i =start;i< end;i++){
          chartData.push([i,this.energyParamForm.value.peak])
        } 
      } 
    }) 
    this.lowCount.map(item=>{
      if(item.name && item.name !== 'selectedLowTime1' && item.name2 && item.name2 !== 'selectedLow2Time1'){
        let start = Number(item.name.substring(0,2));
        let end = Number(item.name2.substring(0,2)); 
        for(let i =start;i< end;i++){
          chartData.push([i,this.energyParamForm.value['off-peak']])
        } 
      } 
    })
    this.pinCount.map(item=>{
      if(item.name && item.name !== 'selectedPinTime1' && item.name2 && item.name2 !== 'selectedPin2Time1'){
        let start = Number(item.name.substring(0,2));
        let end = Number(item.name2.substring(0,2)); 
        for(let i =start;i< end;i++){
          chartData.push([i,this.energyParamForm.value.shoulder])
        } 
      } 
    })
    let newChartData = chartData;
    let times = [];
    chartData.map(item=>{
      times.push(item[0])
    })  
    for(let i =0 ;i<24;i++){
       if(times.indexOf(i) == -1){ 
         newChartData.push([i,0])
       }
    } 
    newChartData.sort(function(x, y){ 
      return x[0]- y[0]; 
    });    
    this.threeTypeTimes = [];
    for(let i in newChartData){
      this.threeTypeTimes.push({"attrName":newChartData[i][0],"attrValue":newChartData[i][1],"order":chartData[i][0]}) 
    }
    
    this.initChart(newChartData,'#02B980')
  }  

  showModal(): void {
    this.isVisible = true;
  }
  
  closeModal(): void {
    this.isVisible = false;
  }

  saveTime(): void { 
    this.refreshChart();
    this.isVisible = false;
  } 

  addTimeChose(type): void { 
    if ( type == 1 ){
      let c = this.topCount[this.topCount.length-1].count
      this.topCount.push({count:c+1,name:'selectedTopTime'+(c+1),name2:'selectedTop2Time'+(c+1)})
    }
    if ( type == 2 ){
      let c = this.pinCount[this.pinCount.length-1].count
      this.pinCount.push({count:c+1,name:'selectedPinTime'+(c+1),name2:'selectedPin2Time'+(c+1)})
    }
    if ( type == 3 ){
      let c = this.lowCount[this.lowCount.length-1].count
      this.lowCount.push({count:c+1,name:'selectedLowTime'+(c+1),name2:'selectedLow2Time'+(c+1)})
    }
  }

  deleteTimeChose(type,count): void {  
    let arr = [count]
    if ( type === 1 ) {
      this.topCount = this.topCount.filter((item) => !arr.includes(item.count)) 
    } 
    if ( type === 2 ) {
      this.pinCount = this.pinCount.filter((item) => !arr.includes(item.count)) 
    }
    if ( type === 3 ) {
      this.lowCount = this.lowCount.filter((item) => !arr.includes(item.count)) 
    } 
  }

  initChart(chartData,color): void {  
    let chartDataP = JSON.parse(JSON.stringify(chartData))
    if(chartDataP.length>0) chartDataP.push([chartDataP[chartDataP.length-1][0]+1,chartDataP[chartDataP.length-1][1]])
    const myChart = echarts.init(document.getElementById('chart'));
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

  initEnergy() :void { 
    this.Api.getEnergyInfo({projectId:this.queryParam.proId}).subscribe(response => { 
      let result = response; 
      if(result && result[0] && result[12]){  
        let chartData = [];
        for(let i in result){ 
          if(result[i].attrName == 'peak')  this.energyParamForm.patchValue({peak:result[i].attrValue})  
          else if(result[i].attrName == 'off-peak')  this.energyParamForm.patchValue({'off-peak':result[i].attrValue})  
          else if(result[i].attrName == 'shoulder')  this.energyParamForm.patchValue({shoulder:result[i].attrValue})   
          else if(result[i].attrName == 'sale_elec')  this.energyParamForm.patchValue({sale_elec:result[i].attrValue})  

          else if(result[i].attrName == 'cold')  this.energyParamForm2.patchValue({cold:result[i].attrValue})  
          else if(result[i].attrName == 'hotwater')  this.energyParamForm2.patchValue({hotwater:result[i].attrValue})
          else if(result[i].attrName == 'stream')  this.energyParamForm2.patchValue({stream:result[i].attrValue})
          else if(result[i].attrName == 'heat')  this.energyParamForm2.patchValue({heat:result[i].attrValue})

          else if(result[i].attrName == 'coal')  this.energyParamForm3.patchValue({coal:result[i].attrValue})  
          else if(result[i].attrName == 'gas')  this.energyParamForm3.patchValue({gas:result[i].attrValue})
          else if(result[i].attrName == 'biofuel')  this.energyParamForm3.patchValue({biofuel:result[i].attrValue})
          else if(result[i].attrName == 'oil')  this.energyParamForm3.patchValue({oil:result[i].attrValue})
          else{
            // 时间
            chartData.push([Number(result[i].attrName),result[i].attrValue])
          }
        }
        chartData.sort(function(x, y){ 
          return x[0]- y[0]; 
        });    
        this.threeTypeTimes = [];
        for(let i in chartData){
          this.threeTypeTimes.push({"attrName":chartData[i][0],"attrValue":chartData[i][1],"order":chartData[i][0]}) 
        } 
        // 显示图
        this.initChart(chartData,'#02B980') 
        // 显示时间框 
        let arr={topArr:[],lowArr:[],pinArr:[]}
        this.pinCount = [];  this.lowCount = [];  this.topCount = []; 
        for(let i =0 ;i<chartData.length;i++){
          if(chartData[i][1] == this.energyParamForm.value.peak && this.energyParamForm.value.peak!=0 ){  // 峰价   
            arr.topArr.push(chartData[i][0]);
          }
          if(chartData[i][1] == this.energyParamForm.value['off-peak'] && this.energyParamForm.value['off-peak']!=0 ){  // 谷价  
            arr.lowArr.push(chartData[i][0]);
          }
          if(chartData[i][1] == this.energyParamForm.value.shoulder && this.energyParamForm.value.shoulder!=0 ){  // 平价  
            arr.pinArr.push(chartData[i][0]); 
          }
        }
 
        // 处理时间改为连续的 
        let count = 0;
        if(arr.lowArr.length>0)
        this.getArr(arr.lowArr).map(item=>{ 
          let value = this.getTimeType(item[0])
          let value2 = this.getTimeType(item[item.length-1]+1) 
          this.lowCount.push({count:count+1,name : value , name2 : value2}) 
          count++;
        })
        if(arr.pinArr.length>0){
          count = 0;
          this.getArr(arr.pinArr).map(item=>{ 
            let value = this.getTimeType(item[0])
            let value2 = this.getTimeType(item[item.length-1]+1) 
            this.pinCount.push({count:count+1,name : value , name2 : value2}) 
            count++;
          })
        }
        if(arr.topArr.length>0){
          count = 0;
          this.getArr(arr.topArr).map(item=>{ 
            let value = this.getTimeType(item[0])
            let value2 = this.getTimeType(item[item.length-1]+1) 
            this.topCount.push({count:count+1,name : value , name2 : value2}) 
            count++;
          })
        }
         
        if(this.lowCount.length<=0) this.lowCount = [{count:1,name:'selectedLowTime1',name2:'selectedLow2Time1'}]; 
        if(this.topCount.length<=0) this.topCount = [{count:1,name:'selectedTopTime1',name2:'selectedTop2Time1'}];
        if(this.pinCount.length<=0) this.pinCount = [{count:1,name:'selectedPinTime1',name2:'selectedPin2Time1'}];  
      }   
    }) 
  }

  getArr(arr){
    var result = [],
        i = 0;
    result[i] = [arr[0]];
    arr.reduce(function(prev, cur){
      cur-prev === 1 ? result[i].push(cur) : result[++i] = [cur];
      return cur;
    });
    return result;
  }

  getTimeType(i):string{
    if(i<10){
      return `0${i}：00`
    }else{
      return `${i}：00`
    }
  }

  ngOnInit() { 
    sessionStorage.setItem("localPage", "energy")
    this.pageState = JSON.parse(sessionStorage.getItem('pageState'))
    this.activatedRoute.queryParams.subscribe(queryParam => {
      if(queryParam == {} || queryParam.create ==undefined){
        this.router.navigate(['/'])   
      }
  
      this.queryParam = queryParam; 
    });
    let isdisabled = (this.queryParam.edit == "true" ? true:false) || (this.queryParam.create == "true" ? true:false)
    this.energyParamForm = this.fb.group({ 
      peak: [{value:0,disabled:!isdisabled}],
      shoulder: [{value:0,disabled:!isdisabled}],
      ['off-peak']: [{value:0,disabled:!isdisabled}], 
      sale_elec: [{value:0,disabled:!isdisabled}],  
    });
    this.energyParamForm2 = this.fb.group({  
      cold: [{value:0,disabled:!isdisabled}], 
      hotwater: [{value:0,disabled:!isdisabled}],
      stream : [{value:0,disabled:!isdisabled}],
      heat : [{value:0,disabled:!isdisabled}], 
    });
    this.energyParamForm3 = this.fb.group({  
      coal: [{value:0,disabled:!isdisabled}], 
      gas: [{value:0,disabled:!isdisabled}],
      biofuel: [{value:0,disabled:!isdisabled}],
      oil: [{value:0,disabled:!isdisabled}],
    });
 
    // if(!(this.queryParam.create == "true" ? true:false)){
      this.initEnergy();
    // }

    for(let i=0;i<25;i++){
      if(i<10){
        this.timeChoose.push("0"+i+"：00")
      }else{
        this.timeChoose.push(i+"：00")
      } 
    }
  }

  ngAfterViewInit(): void {
    this.initChart([],'#02B980');
  }
  saveAnextStep(): void {  
    if((this.queryParam.edit == "true" ? true:false) || (this.queryParam.create  == "true" ? true:false )){
      this.loadNext = true;
      // 提交更新或创建  
      Object.assign(this.energyParamForm.value, this.energyParamForm2.value, this.energyParamForm3.value);   
      let param = {projectId:Number(this.queryParam.proId), data:[]};
      let arr = [];
      let nameOrderArr = {'peak':34,'off-peak':36,'shoulder':35,'sale_elec':25,'cold':26,'hotwater':27,'stream':28,'heat':29,'coal':31,'gas':32,'biofuel':30,'oil':33}
        
      for (let i in this.energyParamForm.value) { 
        arr.push({"attrName":i,"attrValue":this.energyParamForm.value[i],"order":nameOrderArr[i]}); 
      } 
      param.data = arr.concat(this.threeTypeTimes); 
       
      this.Api.addEnergyprice(param).subscribe(response => {  
        this.loadNext = false;
        if(response && response[200] && response[200] == "success"){
          if(this.ifNeedNextStep){
            this.communication.confirmMission("device#1");
          }
        }else{
          let tit = '';
          if(this.queryParam.edit == "true" ? true:false) tit = '修改';
          if(this.queryParam.create == "true" ? true:false) tit = '创建';
          this.message.create("error", `能源市场数据${tit}失败！`);
        }  
      }) 
    }else{
      if(this.ifNeedNextStep){
        this.communication.confirmMission("device#1");
      }
    }  
  }
  previousStep(): void{  
    this.router.navigate(['/load'], { 
      queryParams: this.queryParam
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
