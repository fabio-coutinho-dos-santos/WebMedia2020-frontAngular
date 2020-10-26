import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { XyzComponent } from './xyz/xyz.component';
import { BodyComponent } from './body/body.component';

import { AgmCoreModule } from '@agm/core';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { WSAEACCES } from 'constants';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'coutmasters.ddns.net',
  port: 9001,
  protocol:'ws',
  path: '/mqtt',
  keepalive:5
};


@NgModule({
  declarations: [
    AppComponent,
    XyzComponent,
    BodyComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    AppRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAm-53lvsxRxpelvvV9VB4LSOHFPaQp1H0'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
