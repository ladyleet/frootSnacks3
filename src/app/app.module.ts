import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';
import { AppComponent } from './app.component';
import 'hammerjs';
import { IncrementComponent } from './increment/increment.component';

@NgModule({
  declarations: [
    AppComponent,
    IncrementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
