import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Setting } from '../models/Setting';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settingCollection: AngularFirestoreCollection<Setting>;
  settingDoc: AngularFirestoreDocument<Setting>;
  settings: Observable<Setting[]>;
  setting: Observable<Setting>;

  constructor(private afs: AngularFirestore) {
    this.settingCollection = afs.collection<Setting>('mpt_setting');
  }

  getSettings() {
    this.settings = this.settingCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Setting;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.settings;
  }

  getSetting(id: string): Observable<Setting> {
    this.settingDoc = this.afs.doc<Setting>(`mpt_setting/${id}`);
    this.setting = this.settingDoc.snapshotChanges().pipe(
      map((action) => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Setting;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.setting;
  }

  addSetting(setting: Setting) {
    this.settingCollection.add(setting);
  }

  updateSetting(setting: Setting) {
    this.settingDoc = this.afs.doc(`mpt_setting/${setting.id}`);
    this.settingDoc.update(setting);
  }

  deleteSetting(setting: Setting) {
    this.settingDoc = this.afs.doc(`mpt_setting/${setting.id}`);
    this.settingDoc.delete();
  }
}
