import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title = 'edit';
  msg:any;
  content:any;
  editform:any
  closeResult: string;
  val:any;
  constructor(private shared:SharedService,private modalService: NgbModal,config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  getdata(data,reg:NgForm){
    let mail={
      Email:data.email
  };
    this.shared.getfrommail(mail).subscribe(res=>{
      this.val=res;
      console.log(res);
      if(this.val==null){
        this.msg="Entered Email doesnot exist";
        this.open(this.content)
      }
      else if(this.val.Tpwd!=data.password){
        this.msg="Entered email and Password doesnot match"
        this.open(this.content)
      }
      else if(this.val.Tpwd==data.password){
        this.open(this.editform)
      }
      console.log(this.msg);
    });
    reg.reset();
   
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
  clicked(content1,content2){
    this.editform=content1;
    this.content=content2;
  }
  updatedata(data){
   let dat={
     Email:this.val.Email,
     Mobilenumber:this.val.Mobilenumber,
     Firstname:data.Firstname,
     Middlename:data.Middlename,
     Lastname:data.Lastname,
     Address1:data.Address1,
     Address2:data.Address2,
     Pincode:data.Pincode,
     City:data.City,
     State:data.State,
     Country:data.Country,
     Gender:data.Gender,
     E_q:data.E_q,
     Tpwd:data.Tpwd
   }
   this.shared.updateuser(dat).subscribe(res=>{
    this.msg="Participant updated Successfully";
    this.open(this.content)
   });
  }
  ngOnInit(): void {
  }

}
