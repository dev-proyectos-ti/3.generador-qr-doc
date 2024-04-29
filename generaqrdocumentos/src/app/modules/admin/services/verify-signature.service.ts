import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VerifySignatureService {

  private basePath = environment.baseUrlVerifySignatureBackend;

  constructor(private http: HttpClient) { }

  verifySignature(file: File): Observable<any> {
    const fileBlob: Blob = new Blob([file], { type: file.type });

    return this.http.post<any>(`${this.basePath}verify-signature`, fileBlob).pipe(map((res) => res));
  }
}
