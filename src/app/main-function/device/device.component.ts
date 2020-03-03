import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunicationService } from '../../service/communication.service'
import { DeviceService } from '../service/device.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subscription }   from 'rxjs';
@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  deviceParamForm: FormGroup; 
  deviceParamForm2: FormGroup; 
  pageState: any = {}
  ifNeedNextStep: boolean = true;
  queryParam = null;
  loadNext = false;
  saveState: boolean = true
  subscription: Subscription;
  isdisabled: boolean = true;  // 判断是否是查看

  saveAnextStep(): void {
    console.log("设备页面执行了提交");
    if(this.deviceParamForm.valid){ 
      this.loadNext = true;

      let param = { projectId:this.queryParam.proId,data:[]}
      let result = []; 
      let nameArr = [{"nameValue":"hp_ground_heat","order":1},{"nameValue":"hp_ground_cold","order":2},{"nameValue":"elec_sto","order":3},
      {"nameValue":"cchp","order":4},{"nameValue":"chp","order":5},{"nameValue":"bio_boiler_heat","order":6},
      {"nameValue":"bio_boiler_steam","order":7},{"nameValue":"elec_boiler_steam","order":8},{"nameValue":"elec_boiler_heat","order":9},
      {"nameValue":"coal_boiler_steam","order":10},{"nameValue":"coal_boiler_heat","order":11},
      {"nameValue":"gas_boiler_steam","order":12},{"nameValue":"gas_boiler_heat","order":13},{"nameValue":"heat_exchanger","order":14},
      {"nameValue":"pv","order":15},{"nameValue":"hp_water_heat","order":16},{"nameValue":"hp_water_cold","order":17},
      {"nameValue":"hp_air_heat","order":18},{"nameValue":"hp_air_cold","order":19},{"nameValue":"elec_cold","order":20},
      {"nameValue":"libr_cold","order":21},{"nameValue":"wind_elec","order":22},{"nameValue":"hotwater_sto","order":23}]
      nameArr.map(item=>{
        let isCheck = this.deviceParamForm.value[item.nameValue+'isCheck'];
        let param1 = this.deviceParamForm.value[item.nameValue+'param1']?this.deviceParamForm.value[item.nameValue+'param1']:null;
        let param2 = this.deviceParamForm.value[item.nameValue+'param2']?this.deviceParamForm.value[item.nameValue+'param2']:null;
        let param3 = this.deviceParamForm.value[item.nameValue+'param3']?this.deviceParamForm.value[item.nameValue+'param3']:null;
        result.push({equipmentName:item.nameValue,isCheck,param1,param2,param3,order:item.order})
      })
      param.data = result; 
      this.Api.addEquipment(param,this.saveState).subscribe(response => {  
        this.loadNext = false;
        if(response && response[200] && response[200] == "success"){
          if(this.ifNeedNextStep){
            this.communication.confirmMission("result#1");
          }
        }else{
          let tit = '';
          if(this.queryParam.edit == "true" ? true:false) tit = '修改';
          if(this.queryParam.create == "true" ? true:false) tit = '创建';
          this.message.create("error", `参与设备及参数${tit}失败！`);
        }  
      }) 
    }else if(!(this.isdisabled)){
      if(this.ifNeedNextStep){
        this.communication.confirmMission("result#1");
      }
    } 
  }
  previousStep(): void{ 
    this.router.navigate(['/energy'], { 
      queryParams: this.queryParam
    }) 
  }

  requiredChange(arr,required: boolean): void { 
    arr.map(item=>{
      if (!required) {
        this.deviceParamForm.get(item)!.clearValidators();
        this.deviceParamForm.get(item)!.markAsPristine();
      } else {
        this.deviceParamForm.get(item)!.setValidators(Validators.required);
        this.deviceParamForm.get(item)!.markAsDirty();
      }
      this.deviceParamForm.get(item)!.updateValueAndValidity();
    }) 
  }

  initDeviceInfo():void{
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
          this.deviceParamForm.patchValue({[item.name]:item.value})
        }) 
          
        this.deviceParamForm.patchValue({isCheckBiomass:this.deviceParamForm.value.bio_boiler_steamisCheck||this.deviceParamForm.value.bio_boiler_heatisCheck})
        this.deviceParamForm.patchValue({isCheckElectric:this.deviceParamForm.value.elec_boiler_steamisCheck||this.deviceParamForm.value.elec_boiler_heatisCheck})
        this.deviceParamForm.patchValue({isCheckCoal:this.deviceParamForm.value.coal_boiler_steamisCheck||this.deviceParamForm.value.coal_boiler_heatisCheck})
        this.deviceParamForm.patchValue({isCheckGas:this.deviceParamForm.value.gas_boiler_steamisCheck||this.deviceParamForm.value.gas_boiler_heatisCheck})
        this.deviceParamForm.patchValue({isCheckWaterPump:this.deviceParamForm.value.hp_water_heatisCheck||this.deviceParamForm.value.hp_water_coldisCheck})
        this.deviceParamForm.patchValue({isCheckGroundPump:this.deviceParamForm.value.hp_ground_heatisCheck||this.deviceParamForm.value.hp_water_coldisCheck})    
        this.deviceParamForm.patchValue({isCheckAirPump:this.deviceParamForm.value.hp_air_heatisCheck||this.deviceParamForm.value.hp_air_coldisCheck})       
      
        if(result[23] && ( result[23].equipmentName === "economy" || result[23].equipmentName === "environment" || result[23].equipmentName === "multi-objective")){
          this.saveState = false;
        }
      } 
    }) 
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public communication: CommunicationService,
    public activatedRoute: ActivatedRoute,
    private Api: DeviceService,
    private message: NzMessageService,
  ) { 
    this.subscription = communication.missionAnnounced$.subscribe(
      mission => {
        this.ifNeedNextStep = false
        this.saveAnextStep()
    });
  }
    
  ngOnInit() {
    sessionStorage.setItem("localPage", "device")
    this.pageState = JSON.parse(sessionStorage.getItem('pageState'))

    this.activatedRoute.queryParams.subscribe(queryParam => {
      if(queryParam == {} || queryParam.create ==undefined){
        this.router.navigate(['/']) 
      }
  
      this.queryParam = queryParam; 
    });
    let isdisabled = (this.queryParam.edit == "true" ? true:false) || (this.queryParam.create == "true" ? true:false)
    this.isdisabled = isdisabled;console.log(this.isdisabled)
    this.deviceParamForm = this.fb.group({ 
      cchpisCheck:  [{value:true,disabled:!isdisabled}],
      chpisCheck: [{value:true,disabled:!isdisabled}],
      isCheckBiomass:[{value:true,disabled:!isdisabled}],
      isCheckCoal:[{value:true,disabled:!isdisabled}], 
      isCheckElectric:[{value:true,disabled:!isdisabled}],
      isCheckGas:[{value:true,disabled:!isdisabled}],  
      bio_boiler_steamisCheck: [{value:true,disabled:!isdisabled}],
      bio_boiler_heatisCheck: [{value:true,disabled:!isdisabled}],
      elec_boiler_steamisCheck: [{value:true,disabled:!isdisabled}],
      elec_boiler_heatisCheck: [{value:true,disabled:!isdisabled}],
      coal_boiler_steamisCheck: [{value:true,disabled:!isdisabled}],
      coal_boiler_heatisCheck: [{value:true,disabled:!isdisabled}],
      gas_boiler_steamisCheck: [{value:true,disabled:!isdisabled}],
      gas_boiler_heatisCheck: [{value:true,disabled:!isdisabled}],
      heat_exchangerisCheck: [{value:true,disabled:!isdisabled}],
      pvisCheck: [{value:true,disabled:!isdisabled}], 
      cchpparam1:  [{value:null,disabled:!isdisabled}],
      cchpparam2:  [{value:null,disabled:!isdisabled}],
      cchpparam3:  [{value:null,disabled:!isdisabled}], 
      chpparam1:  [{value:null,disabled:!isdisabled}],
      chpparam2:  [{value:null,disabled:!isdisabled}], 
      bio_boiler_steamparam1:  [{value:null,disabled:!isdisabled}],
      bio_boiler_heatparam1:  [{value:null,disabled:!isdisabled}], 
      elec_boiler_steamparam1:  [{value:null,disabled:!isdisabled}],
      elec_boiler_heatparam1:  [{value:null,disabled:!isdisabled}], 
      coal_boiler_steamparam1:  [{value:null,disabled:!isdisabled}],
      coal_boiler_heatparam1:  [{value:null,disabled:!isdisabled}],
      gas_boiler_steamparam1:  [{value:null,disabled:!isdisabled}],
      gas_boiler_heatparam1:  [{value:null,disabled:!isdisabled}],
      heat_exchangerparam1:  [{value:null,disabled:!isdisabled}],
      pvparam1:  [{value:null,disabled:!isdisabled}], 

      isCheckWaterPump:[{value:true,disabled:!isdisabled}],
      isCheckAirPump:[{value:true,disabled:!isdisabled}],
      isCheckGroundPump:[{value:true,disabled:!isdisabled}], 
      hp_water_heatisCheck: [{value:true,disabled:!isdisabled}],
      hp_water_coldisCheck: [{value:true,disabled:!isdisabled}],
      hp_ground_heatisCheck: [{value:true,disabled:!isdisabled}],
      hp_ground_coldisCheck: [{value:true,disabled:!isdisabled}],
      hp_air_heatisCheck: [{value:true,disabled:!isdisabled}],
      hp_air_coldisCheck: [{value:true,disabled:!isdisabled}],
      elec_coldisCheck: [{value:true,disabled:!isdisabled}],
      libr_coldisCheck: [{value:true,disabled:!isdisabled}],
      wind_elecisCheck: [{value:true,disabled:!isdisabled}],   
      hp_water_heatparam1:  [{value:null,disabled:!isdisabled}],
      hp_water_coldparam1:  [{value:null,disabled:!isdisabled}],
      hp_ground_heatparam1:  [{value:null,disabled:!isdisabled}],
      hp_ground_coldparam1:  [{value:null,disabled:!isdisabled}],
      hp_air_heatparam1:  [{value:null,disabled:!isdisabled}],
      hp_air_coldparam1:  [{value:null,disabled:!isdisabled}],
      elec_coldparam1:  [{value:null,disabled:!isdisabled}],
      libr_coldparam1:  [{value:null,disabled:!isdisabled}],
      wind_elecparam1:  [{value:null,disabled:!isdisabled}],
      wind_elecparam2:  [{value:null,disabled:!isdisabled}], 
      elec_stoisCheck:[{value:null,disabled:!isdisabled}],
      hotwater_stoisCheck:[{value:null,disabled:!isdisabled}], 
    });  
 
    // if(!(this.queryParam.create == "true" ? true:false)){
      this.initDeviceInfo();
    // }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
