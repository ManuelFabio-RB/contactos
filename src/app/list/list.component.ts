import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { DataService } from '../service/data.service';

import * as _ from 'lodash';
import { FormEditComponent } from '../form-edit/form-edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements OnInit {

  @Input() enableEdit: boolean;
  @Input() enableRemove: boolean;

  constructor(
    private readonly dataService: DataService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { }

  contacts: any[];

  ngOnInit() {
    const data = this.dataService.getContacts();
    data.subscribe(c => {
      this.contacts = c;
      this.contacts = _.orderBy(this.contacts, ['name'], ['asc'])
    });
  }

  async edit(id: any) {
    const modal = await this.modalController.create({
      component: FormEditComponent,
      presentingElement: this.routerOutlet.nativeEl,
      canDismiss: true, 
      backdropDismiss: true, 
      showBackdrop: true, 
      componentProps: { id }
    });

    return await modal.present();
  }

  remove(id: any) {
    this.dataService.removeContact(id)
      .then(res => console.log('removed'));
  }

}
