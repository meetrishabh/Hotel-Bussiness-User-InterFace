import { Component, OnInit } from '@angular/core';
import { Home } from '../home';
import { HOMES } from '../mock-homes';
import {GrexterService}from '../grexter.service'
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Options, LabelType } from 'ng5-slider';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-grextor',
  templateUrl: './grextor.component.html',
  styleUrls: ['./grextor.component.scss']
})
export class GrextorComponent implements OnInit {
  // For Search Submit 
  submitsearch:boolean=false;
  // Autocomplete 
  selectedOptionData=[];
  //
  home =HOMES;
  unsortedData=HOMES;
  Discounted = false;
  HighToLow=false;
  labelPosition="LowToHigh";
  LowToHigh=false;
  Available=false;
  constructor(private GrexterService:GrexterService,public dialog: MatDialog) { }

  myControl = new FormControl();
  options: Home[] = HOMES
  filteredOptions: Observable<Home[]>;

  minValue: number = 0;
  maxValue: number = 18000;
  option: Options = {
    floor: 0,
    ceil: 18000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> Rs' + value;
        case LabelType.High:
          return '<b>Max price:</b> Rs' + value;
        default:
          return 'Rs' + value;
      }
    }
  };
  
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent,{
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
//****Click On Submit Button*****
  submitOption(){
    this.home=this.unsortedData;
    this.home.forEach(data=>{
      if(data.property==this.GrexterService.selectedOptionValue){
       this.selectedOptionData=[];
       this.selectedOptionData.push(data);
      }
    });
    (this.selectedOptionData.length==0 ||this.myControl.value=="")?this.home=this.unsortedData:this.home=this.selectedOptionData;

    
     // selectedOptionData has matching data as typed
     this.displayHome("SingleSearch",this.home);
     // For Applying Filters
     this.applyFilter();
 
  }

  //****Autocomplete Option Select****
  selectedOption(event){ // finalized
     console.log("selectedOptionFunction");
     if(event||event.property!=""){
      this.GrexterService.selectedOptionValue=event.property; 
      }
     this.home=this.unsortedData;
     this.home.forEach(data=>{
       if(data.property==this.GrexterService.selectedOptionValue){
        this.selectedOptionData=[];
        this.selectedOptionData.push(data);
       }
     })
     this.home=this.selectedOptionData;
      // selectedOptionData has matching data as typed
      this.displayHome("SingleSearch",this.selectedOptionData);
      // For Applying Filters
      this.applyFilter();
  }
  
  //*****For Displaying Sorted cards*****
  displayHome(Type,data){
    var displayHomeData=data;
    switch(Type){
      case "SingleSearch":
      this.home=displayHomeData;
      break;
      
    }
  }
  //****For Applying Filter****
  applyFilter(){
    if(this.Discounted!=false)
    {
    console.log("Discounted");
    var discountArray=[];
    this.home.forEach(data=>{
                    if(data.discounted==true){
                      discountArray.push(data);
                    }
                  })
    this.home=discountArray;
    }
    switch(this.labelPosition){
        case "!labelPosition":
        this.home.sort(this.sortByProperty('price','asc'));
        break;
        case "labelPosition":
        this.home.sort(this.sortByProperty('price','dsc'))
      }
     if(this.Available==true){
      console.log("Discounted");
      var discountArray=[];
      this.home.forEach(data=>{
                      if(data.available_rooms!=0){
                        discountArray.push(data);
                      }
                    })
      this.home=discountArray;
     }
     if(this.maxValue && this.minValue){
      var discountArray=[];
      this.home.forEach(data=>{
                      if(data.price>this.minValue && data.price<=this.maxValue){
                        discountArray.push(data);
                      }
                    })
      this.home=discountArray;
     }

    
  } 
  displayFn(user?: Home): string | undefined {
    return user ? user.property : undefined;
  }

  private _filter(name: string): Home[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.property.toLowerCase().indexOf(filterValue) === 0);
  }
  sortByProperty = function (property,order) {
      if(order=='asc'){
        return function (x, y) {
          return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
      }else{
        return function (x, y) {
          return ((x[property] === y[property]) ? 0 : ((x[property] < y[property]) ? 1 : -1));
      };
      }
      
  }; 
  
  

    

  
  
}
