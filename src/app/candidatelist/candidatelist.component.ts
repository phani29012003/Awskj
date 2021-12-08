import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {

  constructor(private service:SharedService) { }
  value="";
  unfiltered=[];
  filterusers=[];
  users=[];
  noofusers=0;
  cities=[];
  city="All";
  target=[];

  ngOnInit(): void {

  this.getusers();

  }

  getusers(){
    this.service.getdata().subscribe(data=>{
      this.users=data;
      this.unfiltered=data;
      this.filterusers=data;
      this.noofusers=data.length
      for(let i=0;i<data.length;i++){
        this.cities[i]=data[i].City;
      }
      this.cities=this.cities.filter((n, i) => this.cities.indexOf(n) === i)
      console.log(this.users)
    });
  }
  search(value){
    this.filterusers=this.unfiltered.filter(function(val){
      return val.Email.toString().toLowerCase().includes(
        value.toString().toLowerCase())||
      val.Mobilenumber.toString().toLowerCase().includes(
        value.toString().toLowerCase())||
      val.Firstname.toString().toLowerCase().includes(
        value.toString().toLowerCase())||
      val.City.toString().toLowerCase().includes(
        value.toString().toLowerCase())||
      val.Country.toString().toLowerCase().includes(
        value.toString().toLowerCase())||
      val.State.toString().toLowerCase().includes(
          value.toString().toLowerCase())
    });
  }
}
