import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [FormBuilder]
})
export class FormComponent implements OnInit {

  constructor(
    public formBuilder: FormBuilder,
    private readonly dataService: DataService
  ) { }

  form: FormGroup;
  isSubmitted = false;

  get errorControl() {
    return this.form.controls;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.pattern('[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$')]],
      age: ['', [Validators.required, Validators.min(15), Validators.max(99)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.form.valid) {
      console.log('Por favor, rellena todos los campos')
      return false;
    }else {
      this.dataService.createContact(this.form.value)
      console.log('¡Listo!');
      this.form.reset();
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).setErrors(null);
      });
    }
  }

}
