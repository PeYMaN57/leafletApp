import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  map: any;
  position: any;

  ionViewDidEnter() {
    this.map = L.map('map', {
      zoomControl: true,
      center: [27.9621806,-15.6279822],
      zoom: 10
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
    let marcador = L.marker([28.149228, -15.533408], { draggable: false }).addTo(this.map);
    let distancia: any;

    // Geolocalización
    this.map.locate({ watch: true }).on("locationfound", (e: any) => {      
      // Consultamos si existe y si ya existe le cambiamos la posición
      if (this.position != undefined) {
        this.position.setLatLng([e.latitude, e.longitude]);
        this.map.setView([e.latitude, e.longitude], 30);
        // Calculamos la distancia entre la posición actual y el marcador
        distancia = Math.round(this.map.distance([e.latitude, e.longitude], marcador.getLatLng()));
        // Colocamos la distancia dentro de un Popup
        if (distancia >= 10) {
          this.position.bindPopup("Todavía estás muy lejos del objetivo, concretamente a " + distancia + " metros.").openPopup();
        } else {
          this.position.bindPopup("Estás a menos de 10 metros del objetivo, concretamente a " + distancia + " metros.").openPopup();
        }
      } else {
        this.position = L.circle([e.latitude, e.longitude], {radius: 5}).addTo(this.map);
        this.map.setView([e.latitude, e.longitude], 30);
      }
    });
  }

}
