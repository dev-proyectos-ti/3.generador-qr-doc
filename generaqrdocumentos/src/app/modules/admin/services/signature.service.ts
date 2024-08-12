// signature.service.ts
import { Injectable } from '@angular/core';
import { ISigner } from './signer.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SignatureService {
  constructor() {}

  signDocument(documentData: any) {
    const Signer: ISigner = new (window as any).Signer(); // Casting necesario para acceder a Signer en window
    Signer.init({
      documentPath: documentData.documentPath,
      documentType: documentData.type,
      onSuccess: () => console.log('Firma exitosa'),
      onError: (error: any) => console.error('Error en la firma', error)
    });
    Signer.sign();
  }
}
