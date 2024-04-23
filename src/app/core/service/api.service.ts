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
import { Observable, Subscription, from } from 'rxjs';
import { Auth, UserCredential, User, authState } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private auth: Auth = inject(Auth);
  authState$ = authState(this.auth);
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);
  userSubscription: Subscription
  currentUser: User | null = null;


  
  constructor() {
    this.userSubscription = this.authState$.subscribe((aUser: User | null) => {
      if(aUser){
        this.currentUser = aUser;

      }
    })
   }


  register(email: string, password: string, userName: string, phone: string){
    const userData = createUserWithEmailAndPassword(this.auth,email,password);
    return userData;
  }
  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  signOut(){
    this.auth.signOut();
  }
}
