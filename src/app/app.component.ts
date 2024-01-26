// app.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  
import { MatDialog } from '@angular/material/dialog';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tradeForm: FormGroup;

  constructor(private fb: FormBuilder,private dialog: MatDialog) {
    this.tradeForm = this.fb.group({
      tradeType: ['', Validators.required],
      highestPrice: ['', Validators.required],
      lowestPrice: ['', Validators.required]
    }, { validators: this.priceValidator });

  }
  

  calculateTradePrice() {
    // Implement your logic here
    // You can access form values using this.tradeForm.value
    debugger
    if(!this.tradeForm.valid)
    {
      alert("something went wront, please check all fields are required and valid")
      return
    }
    if(this.tradeForm.value.tradeType.toLowerCase() === 'buy')
    {
      this.calculateForBuy();
    }
    else
    {
      this.calculateForShortSell();
    }
    
  }

  calculateForShortSell()
  {
    const formValue = this.tradeForm.value;
    let buyPrice = (parseFloat(formValue.lowestPrice) - 0.50);
    let stopLossPrice = (parseFloat(formValue. highestPrice) + 0.50);
    let targetPrice = (parseFloat(formValue.lowestPrice)) - ((parseFloat(formValue.highestPrice) - parseFloat(formValue.lowestPrice)) * 2)
    this.openAlert(`<div>Buy Price : ${buyPrice} </br> Stop Loss : ${stopLossPrice} </br> Target Price : ${targetPrice} </div>`)
  }

  calculateForBuy()
  {
    const formValue = this.tradeForm.value;
    let buyPrice = (parseFloat(formValue.highestPrice) + 0.50);
    let stopLossPrice = (parseFloat(formValue.lowestPrice) - 0.50);
    let targetPrice = (parseFloat(formValue.highestPrice)) + ((parseFloat(formValue.highestPrice) - parseFloat(formValue.lowestPrice)) * 2)
    this.openAlert(`<div>Buy Price : ${buyPrice} </br> Stop Loss : ${stopLossPrice} </br> Target Price : ${targetPrice} </div>`)

  }

  priceValidator(form: FormGroup) {
    const highestPrice = form.get('highestPrice')?.value;
    const lowestPrice = form.get('lowestPrice')?.value;

    if (highestPrice !== '' && lowestPrice !== '' && highestPrice <= lowestPrice) {
      return { invalidPrice: true };
    }

    return null;
  }

  openAlert(htmlContent : string) {

    this.dialog.open(CustomAlertComponent, {
      data: { htmlContent },
    });
  }

}
