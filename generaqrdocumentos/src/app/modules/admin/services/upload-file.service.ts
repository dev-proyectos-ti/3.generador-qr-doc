import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  private basePath = environment.baseUrlSinotextBackend + 'trsarchivo/';

  constructor(private http: HttpClient) {}

  uploadFile(file: any, ruc: any): Observable<any> {
    const formData = new FormData();
    formData.append('archivo', file, file?.name);
    formData.append('ruc', ruc);

    const path = this.basePath + 'subirfile';
    return this.http.post(path, formData).pipe(map((res) => res));
  }

  viewFile(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'leerfile';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  viewFileLibre(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'leerfile-libre';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  saveFile(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'trsarchivo-crear';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  deleteFile(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'trsarchivo-eliminar';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  listFile(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'trsarchivo-listar';
    return this.http.post(path, data).pipe(map((res) => res));
  }

  listFileLibre(dato: any){
    const data = { dato : dato };
    const path = this.basePath + 'trsarchivo-listar-libre';
    return this.http.post(path, data).pipe(map((res) => res));
  }
}
