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
  
  openFilter(): void {
    const filter = document.getElementsByTagName('app-filter') as unknown as HTMLElement;
    if(filter) {
      filter.style.display = "block";
    }
  }

  save(): void {
    
  }

}
