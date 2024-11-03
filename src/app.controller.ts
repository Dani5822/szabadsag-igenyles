import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { Data } from './data.dto';
import { updateData } from './data';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  private szabadsagdata: updateData[] = [];

  @Get("szabadsag")
  @Render('form')
  szabadsag() {
    return {
      err:[],
      data:{
        name:"",
        
        start:"",
       
        end:"",
        
        paid:false,
        
        id:"",
        
        reason:"",}
    };
  }

  @Post("szabadsag")
  postszabadsag(@Body() formdata: Data, @Res() response: Response) {
    let err=[];
    let data:updateData={
      name:formdata.name,
      start:formdata.start,
      end:formdata.end,
      paid:formdata.paid=="on"?true:false,
      id:formdata.id,
      reason:formdata.reason
    }
    if(data.start > data.end){
      err.push("Hibás dátumok!");
    }
    if(!data.name||!data.start||!data.end||!data.reason||!data.id){
      err.push("Minden mező kitöltése kötelező!");
    }
    if(data.reason.length < 30){
      err.push("Az indoklásnak legalább 30 karakter hosszúnak kell lennie!");
    }
    if(!/^[A-Z]{3}-[0-9]{3}$/.test(data.id)){
      err.push("Hibás azonosító!");
    }

    if(err.length>0){
      response.render('form', {err:err, data:data});
      return;
    }else{
      this.szabadsagdata.push(data);
      response.redirect(303,'/success')
    }
  }

  @Get('success')
  @Render('success')
  newaccountsuccess(){
    return{
      
    }
  }
    
}
