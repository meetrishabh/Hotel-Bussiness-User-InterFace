import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import { GrextorComponent } from './grextor/grextor.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { Ng5SliderModule } from 'ng5-slider';
import {MatRadioModule} from '@angular/material/radio';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GrextorComponent,
    MyDialogComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    
    MatInputModule,
    MatDialogModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    Ng5SliderModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule
  ],
  entryComponents:[MyDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
