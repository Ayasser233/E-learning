import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(provideFirebaseApp(() => initializeApp(
    {"projectId":"e-learning-8c259",
    "appId":"1:130191243718:web:a61d0a698af9868c0f1ac7",
    "storageBucket":"e-learning-8c259.appspot.com",
    "apiKey":"AIzaSyDNXY-Nv_FFpLEaxsevt4q7Y7UraJBMp5w",
    "authDomain":"e-learning-8c259.firebaseapp.com",
    "messagingSenderId":"130191243718",
    "measurementId":"G-4WX6VKET6X"}))), 
    importProvidersFrom(provideAuth(() => getAuth())), 
    importProvidersFrom(provideFirestore(() => getFirestore())), 
    importProvidersFrom(provideDatabase(() => getDatabase()))
  ]
};
