import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import * as firebaseConfig from './firebase.config.json';
import * as firebaseConfig from './nexus-firebase-admin.json';

@Injectable()
export class FirebaseService implements OnModuleInit {
  public firestore: admin.firestore.Firestore;
  public auth: admin.auth.Auth;

  onModuleInit() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
      });
      this.firestore = admin.firestore();
      this.auth = admin.auth();
    }
  }
}
