import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { FamilyID } from '../models/FamilyID';

@Injectable({
  providedIn: 'root',
})
export class FamilyIdService {
  familyIdCollection: AngularFirestoreCollection<FamilyID>;
  familyIdDoc: AngularFirestoreDocument<FamilyID>;
  familyIDs: Observable<FamilyID[]>;
  familyID: Observable<FamilyID>;

  constructor(private afs: AngularFirestore) {
    this.familyIdCollection = afs.collection<FamilyID>('mpt_familyID');
  }

  getFamilyIDs() {
    this.familyIDs = this.familyIdCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as FamilyID;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.familyIDs;
  }

  getFamilyID(id: string): Observable<FamilyID> {
    this.familyIdDoc = this.afs.doc<FamilyID>(`mpt_familyID/${id}`);
    this.familyID = this.familyIdDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as FamilyID;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.familyID;
  }

  addFamilyID(familyID: FamilyID) {
    this.familyIdCollection.add(familyID);
  }

  updateFamilyID(familyID: FamilyID) {
    this.familyIdDoc = this.afs.doc(`mpt_familyID/${familyID.id}`);
    this.familyIdDoc.update(familyID);
  }

  deleteFamilyID(familyID: FamilyID) {
    this.familyIdDoc = this.afs.doc(`mpt_familyID/${familyID.id}`);
    this.familyIdDoc.delete();
  }
}
