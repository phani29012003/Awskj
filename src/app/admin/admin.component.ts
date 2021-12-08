import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import {NgbModal, ModalDismissReasons,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  msg:any
  closeResult: string;
  content:any;

  constructor(private shared:SharedService, private router:Router,private modalService: NgbModal,config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
   open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',centered: true }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnInit(): void {
  }
  getdata(data,reg:NgForm,content){
    this.content=content;
    this.shared.getadmin(data).subscribe(res=>{
      if(res!=null){
        localStorage.setItem("currentuser",data);
        this.router.navigate(['/list']);
      }
      else{
        this.msg="Invalid data";
        this.open(this.content)
        reg.reset();
      }
    });
}
}
