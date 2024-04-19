import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import {
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable, from } from 'rxjs';
import { Auth, signInWithEmailAndPassword, UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  firebaseAuth = inject(Auth);
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  
  constructor(private auth: Auth, private router: Router) { }


  register(user: User) {
    return addDoc(this._collection, user);

  }
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }
  signOut(){
    return this.firebaseAuth.signOut();
  }
}
