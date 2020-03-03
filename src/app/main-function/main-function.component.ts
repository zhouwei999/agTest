import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../service/communication.service';
import { MainFunctionService } from './service/main-function.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NewProjectService } from '../new-project/new-project.service';
import * as moment from 'moment';

@Component({
  selector: 'main-function',
  templateUrl: './main-function.component.html',
  styleUrls: ['./main-function.component.scss'],
  providers: [CommunicationService]
})
export class MainFunctionComponent {
  enviromentIcon: boolean = false;
  loadIcon: boolean = true;
  energyIcon: boolean = true;
  deviceIcon: boolean = true;
  resultIcon: boolean = true;
  pageState: any = {}
  queryParams: any;
  addProForm: FormGroup;
  nowTime: any=moment().format('YYYY-MM-DD HH:mm:ss')

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public communication: CommunicationService,
    public http: MainFunctionService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private newProjectServiceessage: NewProjectService
  ) { 
    communication.missionConfirmed$.subscribe(
      astronaut => {
        this.nextStep(astronaut)
      }
    )
  }

  pname = "";
  pDec = "";
  edit = "";
  create = "";
  ifShowEdit = false;
  ifShowProNameBtn = false;
  ifShowProDesBtn = false;
  isVisible = false;
  isOkLoading = false;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParam => {
      this.pname = queryParam.pname;
      this.pDec = queryParam.pDec; 
      this.edit = queryParam.edit;
      this.create = queryParam.create;
      if(this.edit == "true" || this.create == "true"){
        this.ifShowEdit = true
      }
      this.queryParams = queryParam;
    });
    // this.queryParams = JSON.parse(sessionStorage.getItem('queryParams'))
    if(sessionStorage.getItem('projectType') == "previous"){
      this.loadIcon = false
      this.energyIcon = false
      this.deviceIcon = false
      this.resultIcon = false
    }
    let pageState = JSON.parse(sessionStorage.getItem('pageState'))
    if(pageState.loadState){
      this.loadIcon = false
    }
    if(pageState.energyState){
      this.energyIcon = false
    }
    if(pageState.deviceState){
      this.deviceIcon = false
    }
    if(pageState.resultState){
      this.resultIcon = false
    }

    this.addProForm = this.fb.group({
      addProName: [null, [Validators.required]], 
      addProDec: [null, [Validators.required]]
    });
  }
  nextStep(params): void {
    let param = params.split("#")[0]
    let judgeIfScribe = params.split("#")[1]
    if(this.edit == "true" || this.create == "true"){
      let localPage = sessionStorage.getItem("localPage")
      if(judgeIfScribe == 0){
        this.communication.announceMission(localPage);
      }
      
    }
   
    this.pageState = JSON.parse(sessionStorage.getItem('pageState'))
    switch(param){
      case 'enviroment':
        this.enviromentIcon = false;
        this.router.navigate(['/enviroment'], {queryParams: this.queryParams});
        break;
      case 'load':
        this.loadIcon = false;
        this.router.navigate(['/load'], {queryParams: this.queryParams});
        this.pageState['loadState'] = true
        sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
        break;
      case 'energy':
        if(sessionStorage.getItem('projectType') == 'previous' || this.pageState['loadState']){
          this.energyIcon = false;
          this.router.navigate(['/energy'], {queryParams: this.queryParams});
          this.pageState['energyState'] = true
          sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
        }
        break;
      case 'device':
        if(sessionStorage.getItem('projectType') == 'previous' || this.pageState['energyState']){
          this.deviceIcon = false;
          this.router.navigate(['/device'], {queryParams: this.queryParams});
          this.pageState['deviceState'] = true
          sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
        }
        break;
      case 'result':
        if(sessionStorage.getItem('projectType') == 'previous' || this.pageState['deviceState']){
          this.resultIcon = false;
          this.router.navigate(['/result'], {queryParams: this.queryParams});
          this.pageState['resultState'] = true
          sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
        }
        break;
    }
    
  }
  changeProName(){
    if(this.edit == "true" || this.create == "true"){
      this.ifShowProNameBtn = true
    }
  }
  changeProDes(){
    if(this.edit == "true" || this.create == "true"){
      this.ifShowProDesBtn = true
    }
  }
  carryProName(param){
    this.ifShowProNameBtn = false
    if(param == "sure"){
      this.http.changeNameDse(this.queryParams.proId,this.pname, this.pDec).subscribe((res)=>{
        if(res && res[200] ){
           
        }  
      })
    }else{
      this.activatedRoute.queryParams.subscribe(queryParam => {
        this.pname = queryParam.pname;
      });
    }
  }
  carryProDes(param){
    this.ifShowProDesBtn = false
    if(param == "sure"){
      this.http.changeNameDse(this.queryParams.proId,this.pname, this.pDec).subscribe((res)=>{
      })

    }else{
      this.activatedRoute.queryParams.subscribe(queryParam => {
        this.pDec = queryParam.pDec; 
      });
    }
  }

  toHis():void{
    this.router.navigate(['/history-project']);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  openCreateModal(): void {
    this.isVisible = true;
  }

  handleOk(): void { 
    for (const i in this.addProForm.controls) {
      this.addProForm.controls[i].markAsDirty();
      this.addProForm.controls[i].updateValueAndValidity();
    }

    if(this.addProForm.valid){
      this.isOkLoading = true; 
      this.newProjectServiceessage.addPro({proName:this.addProForm.value.addProName,proDec:this.addProForm.value.addProDec}).subscribe(response => {  
        if(response && response[200] ){
          sessionStorage.setItem('projectType', 'new')
          this.pageState = {
            enviromentState: true,
            loadState: false,
            energyState: false,
            deviceState: false,
            resultState: false,

          }
          
          this.loadIcon = true;
          this.energyIcon = true;
          this.deviceIcon = true;
          this.resultIcon = true;

          sessionStorage.setItem("pageState", JSON.stringify(this.pageState))  
          this.isVisible = false;
          this.isOkLoading = false;
          sessionStorage.setItem("queryParams",JSON.stringify({ create:true , edit: false,pname: this.addProForm.value.addProName, pDec: this.addProForm.value.addProDec}) )
          this.router.navigate(['/enviroment'], {  
            queryParams: { proId: response[200] ,create:true , edit: false,pname: this.addProForm.value.addProName, pDec: this.addProForm.value.addProDec}  
          })
          
        }else{
          this.message.create("error", `创建失败！`);
        } 
      }); 
    } 
  }
}
