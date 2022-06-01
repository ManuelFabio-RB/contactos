import { Injectable } from '@angular/core';
import { collectionData, docSnapshots, Firestore } from '@angular/fire/firestore';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }
  // Agregar contacto a la colección
  createContact(contact: any) {
    const document = doc(collection(this.firestore, 'contacts'));
    return setDoc(document, contact);
  }

  //traer todos los contactos almacenaos en la colección
  getContacts(): Observable <any[]> {
    const contactsCollection = collection(this.firestore, 'contacts');
    return collectionData(contactsCollection, { idField: 'id'})
      .pipe(map(contacts => contacts as any[]));
  }

  getContactById(id: string): Observable<any> {
    const document = doc(this.firestore, `contacts/${id}`);
    return docSnapshots(document)
      .pipe(map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as any;
      }));
  }

  editContact(contact: any) {
    const document = doc(this.firestore, 'contacts', contact?.id);
    const { id, ...data} = contact;
    return setDoc(document, data);
  }

  removeContact(id: string) {
    const document = doc(this.firestore, 'contacts', id);
    return deleteDoc(document);
  }
}
