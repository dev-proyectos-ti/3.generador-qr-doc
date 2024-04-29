import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent implements OnInit {

  constructor(private router: Router){}

  ngOnInit(): void {
  }

  onSeleccionar(): void{
    this.router.navigate(['genera-qr-documento'],)
  }
}
