import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneraQRDocumentosService {

  private basePath = environment.baseUrlVerifySignatureBackend;

  constructor(private http: HttpClient) { }

  generaQRDocumentos(file: File, tamanio: number,startX: number,startY: number, urlQR: string): Observable<any> {
    const fileBlob: Blob = new Blob([file], { type: file.type });

    const formData: FormData = new FormData();
    formData.append('fileData', file, file.name);
    formData.append('tamanioQR', tamanio.toString());
    formData.append('startX', startX.toString());
    formData.append('startY', startY.toString());
    formData.append('urlQR', urlQR.toString());

    console.log(formData.has('fileData')); // Debería ser true
    console.log(formData.get('tamanioQR')); // Debería mostrar el tamaño que enviaste
    
    return this.http.post<any>(`${this.basePath}genera-qr-documento`, formData).pipe(map((res) => res));
  }
}
