import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-header',
  templateUrl: './details-header.component.html',
  styleUrls: ['./details-header.component.css']
})
export class DetailsHeaderComponent implements OnInit {

  constructor(private router: Router){

  }

  ngOnInit(): void {
  }

  redirect(){
    this.router.navigate(['/']);
  }
}
