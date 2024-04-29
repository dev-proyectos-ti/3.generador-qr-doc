import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TransversalService {
  private basePath = environment.baseUrlSinotextBackend + 'transversal/';

  constructor(private http: HttpClient) {}

  consultarRuc(ruc: any){
    const data = { dato : { ruc: ruc } };
    const path = this.basePath + 'consultar-ruc';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  consultarDni(dni: any){
    const data = { dato : { dni: dni } };
    const path = this.basePath + 'consultar-dni';
    return this.http.post(path, data).pipe(map((res) => res));
  }
}
