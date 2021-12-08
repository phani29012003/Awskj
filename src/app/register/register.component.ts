import { FnParam } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit { 
  constructor(private service:SharedService, private modalService: NgbModal) { }
  msg:any="";
  content:any;
  val={
    Email:"",
    Mobilenumber:"",
    Firstname:"",
    Middlename:"",
    Lastname:"",
    Address1:"",
    Address2:"",
    Pincode:"",
    City:"",
    State:"",
    Country:"",
    Gender:"",
    E_q:"",
    Tpwd:""
  };
  ngOnInit(): void {
  }
  getdata(data,reg:NgForm){
    let pwd=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    this.val={
      Email:data.email,
      Mobilenumber:data.phone,
      Firstname:data.First_Name,
      Middlename:data.Middle_Name,
      Lastname:data.Last_Name,
      Address1:data.Address1,
      Address2:data.Address2,
      Pincode:data.Zip,
      City:data.City,
      State:data.State,
      Country:data.Country,
      Gender:data.Gender,
      E_q:data.eq,
      Tpwd:pwd.toString()
    }
    console.log(this.val);
   this.service.adddata(this.val).subscribe(res=>{
     this.msg=res;
     this.openVerticallyCentered(this.content);
     if(res == "Participant added succesfully")
     {
      this.service.sendmail(this.val).subscribe(res=>{ 
      });
     }
   });
   reg.resetForm();
  }
  setdata(content){
    this.content=content
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

}
