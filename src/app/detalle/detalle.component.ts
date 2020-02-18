import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent {
  
  id:any = null;
  lugar:any = {};

  constructor(private route: ActivatedRoute, private lugaresService:LugaresService){
    console.log(this.route.snapshot.params['id']);
    console.log(this.route.queryParamMap);
    // console.log(this.route.snapshot.queryParams['action2']);
    // console.log(this.route.snapshot.queryParams['referer']);
    // console.log(this.route.snapshot.queryParams['referer2']);
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.lugaresService.getLugar(this.id)
      .subscribe((lugar)=>{
        this.lugar = lugar;

      });
    // console.log(this.buscarLugar());
    //this.lugar = this.lugaresService.buscarLugar(this.id);
  }
  
}