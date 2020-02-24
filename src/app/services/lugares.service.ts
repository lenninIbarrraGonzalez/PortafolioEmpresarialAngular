import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class LugaresService {

  API_ENDPOINT = 'https://appportafolio-63774.firebaseio.com';
  // lugares:any = [
  //   {id:1, plan: 'pagado', cercania: 1, distancia: 10, active: true, nombre: 'Capitan Nirvana', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:2, plan: 'gratuito', cercania: 1, distancia: 12, active: true, nombre: 'Barba Roja', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:3, plan: 'gratuito', cercania: 1, distancia: 15, active: false, nombre: 'El barto', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:4, plan: 'gratuito', cercania: 2, distancia: 30, active: true, nombre: 'Rey lagarto', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:5, plan: 'pagado', cercania: 2, distancia: 32, active: true, nombre: 'Retro ochentas', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:6, plan: 'gratuito', cercania: 3, distancia: 80, active: true, nombre: 'Filomena', descripcion: 'Descripción  del lugar, más adelante mayor información'},
  //   {id:7, plan: 'gratuito', cercania: 3, distancia: 69, active: false, nombre: 'coyote', descripcion: 'Descripción  del lugar, más adelante mayor información'}
  // ];

   constructor(private afDB:AngularFirestore, private http: HttpClient){
    
   }
  
  public getLugares(){
    //return this.lugares;
    return this.afDB.collection('lugares').valueChanges();
  }
  // public buscarLugar(id){
  //   return this.lugares.filter((lugar)=>{
  //     return lugar.id == id})[0] || null;
  // }
   public guardarLugar(lugar){
      //UTILIZANDO SOCKETS
     //this.afDB.collection('lugares').doc(lugar.id).set(lugar);

     //UTILIZANDO HTTP
     const headers = new HttpHeaders({'Content-Type':'application/json'});
     return this.http.post(this.API_ENDPOINT+'/lugares',lugar,{headers: headers}).subscribe();
    
     
   }

   public editarLugar(lugar){
     this.afDB.collection('lugares').doc(lugar.id).set(lugar);
   }

   public obtenerGeoData(direccion){

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + direccion + '.json?access_token=pk.eyJ1Ijoid2VyZDIwMDAiLCJhIjoiY2szdnowd3BpMHQ1eDNlbzFkbzlxbjFraCJ9._Z1lvFBENlSl58pJMCAIPg';
    return this.http.get(url);
    }

    public getLugar(id: string){
      return this.afDB.collection('lugares').doc(id).valueChanges();
    }
}  
