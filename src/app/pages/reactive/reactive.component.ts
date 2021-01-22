import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  
  form:FormGroup;
 
  constructor( private formBuilder:FormBuilder,
               private validadores:ValidadoresService) { 
    this.crearFormulario();
    this.cargarDatosAlFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }
  get pasaTiempos(){
    return this.form.get('pasaTiempos') as FormArray
  }
  
  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched
  }

  get apelldiNoValido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched
  }
  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }
  get districtoNoValido(){
    return this.form.get('direccion.districto').invalid && this.form.get('direccion.districto').touched
  }
  get ciudadNoValida(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched
  }

  get pass1NoValido(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched
  }
  get pass2NoValido(){
    const PASS1 = this.form.get('pass1').value;
    const PASS2 = this.form.get('pass2').value;
    return (PASS1 === PASS2)? false:true;
  }
  get usuarioNoValido(){
    return this.form.get('usuario').invalid && this.form.get('usuario').touched
  }


  crearListeners(){
    // this.form.valueChanges.subscribe(valor =>{
    //   console.log(valor);
    // });
    // this.form.statusChanges.subscribe(status =>{
    //   console.log(status);
    // });
    this.form.get('nombre').valueChanges.subscribe(console.log)
  }

  crearFormulario(){

    //Cada variable Representa un componente del FORM
    this.form = this.formBuilder.group({
      nombre:    ['',[Validators.required, Validators.minLength(5)]],
      apellido:  ['',[Validators.required,this.validadores.noHerrera]],
      email:     ['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario:     ['', ,this.validadores.existeUsuario],
      pass1:     ['',Validators.required],
      pass2:     ['',Validators.required],
      direccion: this.formBuilder.group({
        districto: ['',Validators.required],
        ciudad   : ['',Validators.required],
      }),
      pasaTiempos: this.formBuilder.array([])
    },{
      validators: this.validadores.passIguales('pass1','pass2')
    });
  }
  cargarDatosAlFormulario(){
    this.form.reset({
      nombre    :'Rafael',
      apellido  :'Romero',
      email     :'rafael.david.romero22@gmail.com',
      pass1     :'123',
      pass2     :'123',

      direccion : ({
        districto:'Cordoba',
        ciudad   :'Cordoba',
      }),
      pasaTiempos:[
        
      ] 
    });

    ["Rafael","Romero"].forEach(element => this.pasaTiempos.push(this.formBuilder.control(element)));
  }

  agregarPasatiempo(){
    this.pasaTiempos.push(this.formBuilder.control(""));
  }
  borrarElemento(index:number){
    this.pasaTiempos.removeAt(index);
  }

  guardar(form:FormGroup ){

    if(form.invalid){
      Object.values(form.controls).forEach( control =>{
        control.markAsTouched();

        if(control instanceof FormGroup){
          // Toma los valores del control.controls, los recorre y les va cambiando la propiedad de markAsTouched()
          Object.values(control.controls).forEach(control => control.markAsTouched());
        }else{
          control.markAsTouched();
        }
      })
      return;
    }
    console.log(form.value);

    //Reset del Formulario  
    this.form.reset({
      nombre:'Sin Nombre'
    })
  }

 
}
