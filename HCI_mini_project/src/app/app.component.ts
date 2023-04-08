import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  cccform = new FormGroup({
    nameOnCard: new FormControl('', [Validators.required])
  },[]);


  constructor() { }


  ngOnInit(): void {
    
  }       

  save(): void {
    
  }

}
