import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NewProjectService } from '../new-project.service';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-history-project',
  templateUrl: './history-project.component.html',
  styleUrls: ['./history-project.component.scss']
})
export class HistoryProjectComponent implements OnInit {
  validateForm: FormGroup; 
  addProForm: FormGroup; 

  users: any = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1; 
  listOfData: any = [];
  loading = true;  

  isVisible = false;
  isOkLoading = false;
  nowTime: any=moment().format('YYYY-MM-DD HH:mm:ss')
  pageState = {
    enviromentState: true,
    loadState: false,
    energyState: false,
    deviceState: false,
    resultState: false,
  }
    
  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
 
    let str = '';
    if(this.validateForm.value.proName) str += `${str}projectName=${this.validateForm.value.proName}&`
    if(this.validateForm.value.creator) str += `${str}creator=${this.validateForm.value.creator}&`
    if(this.validateForm.value.createTime && this.validateForm.value.createTime.length>0 ) {
      str += `${str}startTime=${moment(this.validateForm.value.createTime[0]).format('YYYY-MM-DD HH:mm:ss')}&endTime=${moment(this.validateForm.value.createTime[1]).format('YYYY-MM-DD HH:mm:ss')}&`
    } 
    this.Api.getProList({pageSize:this.pageSize,pageIndex:this.pageIndex},str) 
      .subscribe(data => {  
        this.loading = false;
        this.total = data['allTotal'];
        this.listOfData = data[200];
        console.log(this.listOfData)
    });
  }
  
  goBack(): void {
    history.go(-1);
  }

  resetForm(): void {
    this.validateForm.reset();
    this.searchData(true)
  }

  submitForm(): void { 
    this.searchData() 
  }

  showDeleteConfirm(item): void {
    this.modalService.confirm({
      nzTitle: `确定删除 “${item.projectName}” 项目？`, 
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {  
        this.Api.delPro(item.projectId).subscribe(response => {  
          if(response && response[200] && response[200] == "success"){  
            this.message.create("success", `删除成功！`); 
            this.searchData(true);
          }else{
            this.message.create("error", `删除失败！`);
          } 
        }); 
      },
      nzCancelText: '取消', 
    });
  }
 
  toseeOrEdit(item,type):void {
    sessionStorage.setItem('projectType', 'previous')
    this.pageState = {
      enviromentState: true,
      loadState: true,
      energyState: true,
      deviceState: true,
      resultState: true,
    }
    sessionStorage.setItem("pageState", JSON.stringify(this.pageState))  
    sessionStorage.setItem("queryParams",JSON.stringify({ proId:item.projectId , create: false , edit: type == 2? true:false,pname: item.projectName, pDec: item.projectDesc}) )
    this.router.navigate(['/enviroment'], {  // +"-"+ item.createTime.substring(0,10)
      queryParams: { proId:item.projectId , create:false,edit: type == 2? true:false,pname: item.projectName, pDec: item.projectDesc, location: item.location}  
    })
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void { 
    for (const i in this.addProForm.controls) {
      this.addProForm.controls[i].markAsDirty();
      this.addProForm.controls[i].updateValueAndValidity();
    }

    if(this.addProForm.valid){
      this.isOkLoading = true; 
      this.Api.addPro({proName:this.addProForm.value.addProName,proDec:this.addProForm.value.addProDec}).subscribe(response => {  
        if(response && response[200] ){
          sessionStorage.setItem('projectType', 'new')
          this.pageState = {
            enviromentState: true,
            loadState: false,
            energyState: false,
            deviceState: false,
            resultState: false,
          }
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

  handleCancel(): void {
    this.isVisible = false;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NzModalService,
    private Api: NewProjectService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void { 
    this.validateForm = this.fb.group({
      proName: [null],
      creator: [null], 
      createTime: [null]
    });
    this.addProForm = this.fb.group({
      addProName: [null, [Validators.required]], 
      addProDec: [null, [Validators.required]]
    });
 
    this.Api.searchUser().subscribe(response => {  
      if( response ){
        for(let i in response){
          this.users.push({userName:response[i].userName,id:response[i].id})
        } 
      } 
    });

    this.searchData();
  } 
}
