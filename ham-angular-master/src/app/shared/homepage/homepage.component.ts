import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl:'./homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
  constructor(private router:Router){
  }
  
  login(){
    this.router.navigate(['login'])
  }

  signup(){
    this.router.navigate(['signup'])
  }
  
}
