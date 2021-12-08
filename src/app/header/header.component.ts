import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
currentDate:any
currentTime:any
list=true;
logout=true;
admin=false;
  constructor(public datepipe: DatePipe, private router:Router) {
   }

  ngOnInit(): void {

    setInterval(() => {
      if(localStorage.getItem("currentuser")){
        this.admin=true;
        this.list=false;
        this.logout=false;
      }
      this.currentDate =this.datepipe.transform((new Date), 'dd/MM/yyyy');
      this.currentTime =this.datepipe.transform((new Date), 'h:mm:ss a');
    }, 1000);
  }
  Logout(){
    localStorage.removeItem("currentuser");
    this.admin=false;
    this.list=true;
    this.logout=true;

    this.router.navigate(["/"])

  }

}
