import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario ={
    nombre:'Rafael',
    apellido:'Romero',
    email: 'rafael.david.romero22@gmail.com',
    pais:'ARG',
    genero:'M'
  }

  paises:any[] = [];

  constructor( private paisServices:PaisService) { }

  ngOnInit(): void {
    this.paisServices.getPaises().subscribe( paises =>{
      this.paises = paises;
      this.paises.unshift({
        nombre:'[Selecione un Pais]',
        codigo:''
      })
      //console.log(this.paises);
    });
  }

  guardar(form:NgForm){

    if(form.invalid){
      Object.values(form.controls).forEach( control =>{
        control.markAsTouched();
      })
      return;
    }
    console.log(form.value);
  }
}
