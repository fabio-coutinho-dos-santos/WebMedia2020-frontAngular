import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { NgxSpinnerService } from 'ngx-spinner'
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LocationServiceService } from '../location-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  providers:[LocationServiceService]
})


export class BodyComponent implements OnInit {


  private subscription: Subscription;
  public message: string;

  public texto : string = '';
  public lat: number = 0;
  public lng: number = 0;
  public zoom: number = 15;

  public modalRef: BsModalRef;
  public textoModal
  public textoModalSecundario

  public config = {
    ignoreBackdropClick: false
  };

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);

    this.locationService.getLocation(this.lat, this.lng)

    .subscribe((resp:any)=>{
      console.log(resp.results[0].formatted_address)
      this.textoModal='Endereço:'
      this.textoModalSecundario = resp.results[0].formatted_address.toString()
    },(err)=>{
      alert("ERRO !!")
    })

  }

  constructor(private _mqttService: MqttService,
     private spinnerService: NgxSpinnerService,
     private locationService: LocationServiceService,
     private modalService: BsModalService) {
    
  }

  ngOnInit(): void {

    this.subscription = this._mqttService.observe('RecebeLocalizacaoFront3').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();

      this.spinnerService.hide()

      let aux = this.message.split('#')
      this.lat = parseFloat(aux[0].valueOf())
      this.lng = parseFloat(aux[1].valueOf())
      console.log('Recebeu')
    });
  }

  


  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: false});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public getIonic(){
    this.spinnerService.show()
    this.unsafePublish('EnviaLocation','1')
    console.log("mandou")
  }

  public getReactNative(){
    this.spinnerService.show()
    this.unsafePublish('EnviaLocationReactNative','1')
    console.log("mandou")
  }

  public getAndroid(){
    this.spinnerService.show()
    this.unsafePublish('EnviaLocationAndroid','1')
    console.log("mandou")
  }

  public markerClicked(){
   
  }
  
  public oK(){
    this.modalRef.hide()
  }
}
