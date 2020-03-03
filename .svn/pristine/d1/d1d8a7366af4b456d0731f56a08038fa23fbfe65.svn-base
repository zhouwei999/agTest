import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms'; 
import { UploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as echarts from 'echarts';
import { Router,ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx'; 
import { LoadService } from '../service/load.service' 
import { CommunicationService } from '../../service/communication.service'
import { UploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription }   from 'rxjs'; 
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

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.scss'],
})
export class LoadComponent implements OnInit {
  nowParamForm: FormGroup; 
  tabs = [{title:'日电需求',value:'electricity'},{title:'日蒸汽需求',value:'steam'}
  ,{title:'日供暖需求',value:'heat'},{title:'日热水需求',value:'hotwater'},{title:'日冷需求',value:'cold'}];
  loadingUpload = false;
  proId = null;
  isEdit = false;
  create = false;
  queryParam = null;
  pageState: any = {}
  i = 0;
  loadNext = false
  editId: string | null;
  ifNeedNextStep: boolean = true; 
  // 请求后台如果没数据默认给表格样式
  listOfData: ItemData[] = [
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
  listOfData2: ItemData[] = [
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
  listOfData3: ItemData[] = [
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
  listOfData4: ItemData[] = [
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
  listOfData5: ItemData[] = [
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
  subscription: Subscription;
  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if ( this.editId ) {
      let className : any = (e.target as any).className;
      if( className instanceof String && className.indexOf('tableInput') == -1 ){
        this.editId = null;
      } 
    }
  }

  chooseTab(value): void {   
    let type = value == 0? 'electricity':(value == 1? 'steam' :( value == 2? 'heat':(value == 3? 'hotwater': 'cold')))
    this.refreshChart(type); 
  }
 
  customReq = (item: UploadXHRArgs) => { 
    const formData = new FormData(); 
    formData.append('sourceFile', item.file as any);
    formData.append('projectId', this.queryParam.proId);
    formData.append('dataSource', 'load');
 
    return this.Api.uploadExcel(formData).subscribe( 
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) { 
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
        this.initLoad();
      },
      err => {
        console.log("error")
        item.onError!(err, item.file!);
        this.initLoad();
      }
    );
  };

  downLoad(){ 
      // 使用 XLSX.utils.aoa_to_sheet(excleData);
      let excleData = [
          ['时间','日电需求','日蒸汽','日供暖',	'日热水','日冷'], 
      ];
      let params = [];
      for(let i = 0;i<8;i++){
        params.push({order:i,electricity:this.listOfData[i].needValue1?this.listOfData[i].needValue1:0,
                    steam:this.listOfData2[i].needValue1?this.listOfData2[i].needValue1:0,
                    heat:this.listOfData3[i].needValue1?this.listOfData3[i].needValue1:0,
                    hotwater:this.listOfData4[i].needValue1?this.listOfData4[i].needValue1:0,
                    cold:this.listOfData5[i].needValue1?this.listOfData5[i].needValue1:0})
        params.push({order:i+8,electricity:this.listOfData[i].needValue2?this.listOfData[i].needValue2:0,
                    steam:this.listOfData2[i].needValue2?this.listOfData2[i].needValue2:0,
                    heat:this.listOfData3[i].needValue2?this.listOfData3[i].needValue2:0,
                    hotwater:this.listOfData4[i].needValue2?this.listOfData4[i].needValue2:0,
                    cold:this.listOfData5[i].needValue2?this.listOfData5[i].needValue2:0})
        params.push({order:i+16,electricity:this.listOfData[i].needValue3?this.listOfData[i].needValue3:0,
                    steam:this.listOfData2[i].needValue3?this.listOfData2[i].needValue3:0,
                    heat:this.listOfData3[i].needValue3?this.listOfData3[i].needValue3:0,
                    hotwater:this.listOfData4[i].needValue3?this.listOfData4[i].needValue3:0,
                    cold:this.listOfData5[i].needValue3?this.listOfData5[i].needValue3:0})
      }  
      params.sort(function(x, y){
        return x.order- y.order;
      }); 
  	 
      // 使用 XLSX.utils.json_to_sheet(excleData);
      // const excleData = [
      //     {周一: '语文', 周二: '数学', 周三: '历史', 周四: '政治', 周五: '英语'},
      //     {周一: '数学', 周二: '数学', 周三: '政治', 周四: '英语', 周五: '英语'},
      //     {周一: '政治', 周二: '英语', 周三: '历史', 周四: '政治', 周五: '数学'},
      // ];
      params.map(item=>{
        let time = `${item.order}-${item.order+1}时`
        excleData.push([time,item.electricity,item.steam,item.heat,item.hotwater,item.cold])
      })
     
      // 设置表格样式，!cols为列宽
      const options = {
        '!cols': [
              { wpx: 100 },
              { wpx: 100 },
              { wpx: 100 },
              { wpx: 100 },
              { wpx: 100 },
              { wpx: 100 },
      ]};
    // 制作工作表的方式有很多种，以数组和对象为例
      const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(excleData);
      // const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excleData);
 
    // 使用指定的单元格作为起点插入数据，r：行， c：列，详情看官网文档
      // XLSX.utils.sheet_add_aoa(worksheet, [[“数学”，“语文”], [“政治”，“语文”], [“历史”，“政治”], ], {origin: {r: 2, c: 5}});
      worksheet['!cols'] = options['!cols'];

      // 新建一个工作簿
      const workbook: XLSX.WorkBook = XLSX.utils.book_new();

      /* 将工作表添加到工作簿*/
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      /* 输出工作表， 由文件名决定的输出格式*/
      XLSX.writeFile(workbook, '华光负荷需求.xlsx');
  }

  startEdit(id: string, event: MouseEvent): void {  
    if( this.isEdit || this.create ){
      event.preventDefault();
      event.stopPropagation();
      this.editId = id;
    } 
  }

  refreshChart(type): void { 
    let chartData = [];
    let count = 0;
    let oldData = [];
    if(type == "electricity") oldData = this.listOfData; 
    if(type == "steam") oldData = this.listOfData2; 
    if(type == "heat") oldData = this.listOfData3; 
    if(type == "hotwater") oldData = this.listOfData4; 
    if(type == "cold") oldData = this.listOfData5; 
     
    oldData.map(item=>{  
      chartData.push([count,item.needValue1]);   
      chartData.push([count+8,item.needValue2]);  
      chartData.push([count+16,item.needValue3]); 

      count ++;
    })
    chartData.sort(function(x, y){
      return x[0]- y[0];
    });  
    this.initChart(chartData,'#02B980')
  }

  initChart(chartData,color): void {  
    if(chartData.length>0) chartData.push([chartData[23][0]+1,chartData[23][1]])
    let myChart = echarts.init(document.getElementById("chart")); 
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
 
  initLoad(): void {  
    // if(!this.create){
      this.Api.getLoadInfo(this.proId).subscribe(response => { 
        let result = response; 
        if(result && result[0]){
          for(let i=0;i<8;i++){
            this.listOfData[i].needValue1 = result[i]['electricity'];  
            this.listOfData[i].needValue2 = result[i+8]['electricity'];  
            this.listOfData[i].needValue3 = result[i+16]['electricity']; 
  
            this.listOfData2[i].needValue1 = result[i]['steam'];  
            this.listOfData2[i].needValue2 = result[i+8]['steam'];  
            this.listOfData2[i].needValue3 = result[i+16]['steam']; 
  
            this.listOfData3[i].needValue1 = result[i]['heat'];  
            this.listOfData3[i].needValue2 = result[i+8]['heat'];  
            this.listOfData3[i].needValue3 = result[i+16]['heat']; 
  
            this.listOfData4[i].needValue1 = result[i]['hotwater'];  
            this.listOfData4[i].needValue2 = result[i+8]['hotwater'];  
            this.listOfData4[i].needValue3 = result[i+16]['hotwater']; 
  
            this.listOfData5[i].needValue1 = result[i]['cold'];  
            this.listOfData5[i].needValue2 = result[i+8]['cold'];  
            this.listOfData5[i].needValue3 = result[i+16]['cold']; 
          } 

          // 负荷现状
          this.nowParamForm= this.fb.group({ 
            electricity: [result[24].electricity],
            steam: [result[24].steam], 
            heat: [result[24].heat],
            hotwater: [result[24].hotwater], 
            cold: [result[24].cold]
          });
        }
         
        this.refreshChart('electricity');
 
      }) 
    // } 
  }
 
  constructor(
    private fb: FormBuilder,
    private msg: NzMessageService,
    private router: Router,
    private Api: LoadService,
    private activatedRoute: ActivatedRoute,
    public communication: CommunicationService,
    private message: NzMessageService 
  ) {
    this.subscription = communication.missionAnnounced$.subscribe(
      mission => {
        this.ifNeedNextStep = false
        this.saveAnextStep()
    });
  }

  ngOnInit(): void {  
    sessionStorage.setItem("localPage", "load")
    this.pageState = JSON.parse(sessionStorage.getItem('pageState')) 
    this.activatedRoute.queryParams.subscribe(queryParam => {  
      if(queryParam == {} || queryParam.create ==undefined){
        this.router.navigate(['/']) 
      }
      
      this.proId = queryParam.proId;
      this.isEdit = queryParam.edit == "true" ? true:false;
      this.create = queryParam.create == "true" ? true:false;

      this.queryParam = queryParam; 
    });

    this.nowParamForm = this.fb.group({ 
      electricity: [{value:null,disabled:!this.isEdit && !this.create}],
      steam: [{value:null,disabled:!this.isEdit && !this.create}],
      heat: [{value:null,disabled:!this.isEdit && !this.create}],
      hotwater: [{value:null,disabled:!this.isEdit && !this.create}], 
      cold: [{value:null,disabled:!this.isEdit && !this.create}],
    });

    this.initLoad();
  }  
  
  ngAfterViewInit(): void {
    this.initChart([],'#02B980');
  }
    
  saveAnextStep(): void {
    // this.pageState['energyState'] = true
    // sessionStorage.setItem("pageState", JSON.stringify(this.pageState))

    if(this.isEdit || this.create){
      this.loadNext = true;

      // 提交更新或创建 
      let paramsAll = { projectId : this.proId ,data:[]};
      let params = [];
      for(let i = 0;i<8;i++){
        params.push({order:i,electricity:this.listOfData[i].needValue1?this.listOfData[i].needValue1:0,
                    steam:this.listOfData2[i].needValue1?this.listOfData2[i].needValue1:0,
                    heat:this.listOfData3[i].needValue1?this.listOfData3[i].needValue1:0,
                    hotwater:this.listOfData4[i].needValue1?this.listOfData4[i].needValue1:0,
                    cold:this.listOfData5[i].needValue1?this.listOfData5[i].needValue1:0})
        params.push({order:i+8,electricity:this.listOfData[i].needValue2?this.listOfData[i].needValue2:0,
                    steam:this.listOfData2[i].needValue2?this.listOfData2[i].needValue2:0,
                    heat:this.listOfData3[i].needValue2?this.listOfData3[i].needValue2:0,
                    hotwater:this.listOfData4[i].needValue2?this.listOfData4[i].needValue2:0,
                    cold:this.listOfData5[i].needValue2?this.listOfData5[i].needValue2:0})
        params.push({order:i+16,electricity:this.listOfData[i].needValue3?this.listOfData[i].needValue3:0,
                    steam:this.listOfData2[i].needValue3?this.listOfData2[i].needValue3:0,
                    heat:this.listOfData3[i].needValue3?this.listOfData3[i].needValue3:0,
                    hotwater:this.listOfData4[i].needValue3?this.listOfData4[i].needValue3:0,
                    cold:this.listOfData5[i].needValue3?this.listOfData5[i].needValue3:0})
      }  
      
      params.sort(function(x, y){
        return x.order- y.order;
      }); 
      params.push({order:25,...this.nowParamForm.value}) 
      paramsAll.data = params;

      this.Api.addLoadInfo(paramsAll).subscribe(response => {   
        this.loadNext = false;
        if(response && response[200] && response[200] == "success"){
          if(this.ifNeedNextStep){
            this.communication.confirmMission("energy#1");
          } 
         
        }else{
          let tit = '';
          if(this.isEdit) tit = '修改';
          if(this.create) tit = '创建';
          this.message.create("error", `负荷需求${tit}失败！`);
        }  
      })
      
    }else{
      if(this.ifNeedNextStep){
        this.communication.confirmMission("energy#1");
      } 
    }
    
    
  }
  previousStep(): void{ 
    this.router.navigate(['/enviroment'], { 
      queryParams: this.queryParam
    }) 
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
