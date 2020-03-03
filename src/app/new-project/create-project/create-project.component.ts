import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NewProjectService } from "../new-project.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommunicationService } from '../../service/communication.service'
import { Subscription }   from 'rxjs';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  validateForm: FormGroup;
  recentPros: any=[];
  nowTime: any=moment().format('YYYY-MM-DD HH:mm:ss')
  pageState = {
    enviromentState: true,
    loadState: false,
    energyState: false,
    deviceState: false,
    resultState: false,
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if(this.validateForm.valid){
      sessionStorage.setItem('projectType', 'new')
      sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
      this.Api.addPro(this.validateForm.value).subscribe(response => { 
        if(response && response[200]){
          sessionStorage.setItem("queryParams", JSON.stringify({ create:true , edit: false,pname: this.validateForm.value.proName, pDec: this.validateForm.value.proDec}))
          sessionStorage.setItem("localPage", "enviroment")
          this.router.navigate(['/enviroment'], { 
            queryParams: { proId: response[200] ,create:true , edit: false,pname: this.validateForm.value.proName, pDec: this.validateForm.value.proDec}  
          })
         
        }else{
          this.message.create("error", `创建失败！`);
        }
      })
    } 
  }

  seePro(item): void {
    sessionStorage.setItem('projectType', 'previous')
    this.pageState = {
      enviromentState: true,
      loadState: true,
      energyState: true,
      deviceState: true,
      resultState: true,
    }
    sessionStorage.setItem("pageState", JSON.stringify(this.pageState))
    sessionStorage.setItem("queryParams",JSON.stringify({ proId:item.projectId , create: false , edit: false,pname: item.projectName, pDec: item.projectDesc}) )
    this.router.navigate(['/enviroment'], { 
      queryParams: { proId:item.projectId , create: false , edit: false,pname: item.projectName, pDec: item.projectDesc, location: item.location}  
    })
    
    
  }

  seeMorePro(): void { 
    this.router.navigate(['/history-project']);
  }

  getProListInit():void {
    this.Api.getProList({pageSize:7,pageIndex:1},'').subscribe(response => {  
      if(response && response[200]){
        this.recentPros = response[200];  
      } 
    })
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public Api: NewProjectService,
    private message: NzMessageService,
    public communication: CommunicationService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      proName: [null, [Validators.required]],
      proDec: [null, [Validators.required]], 
    });
    this.getProListInit() 
  }
}
