import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormEditComponent } from './form-edit.component';

@NgModule({
  imports: [ 
    CommonModule, 
    FormsModule, 
    IonicModule, 
    ReactiveFormsModule
  ],
  declarations: [FormEditComponent],
  exports: [FormEditComponent]
})
export class FormEditComponentModule {}