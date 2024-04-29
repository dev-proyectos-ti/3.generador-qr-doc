import { Component, OnInit } from '@angular/core';
import { GeneraQRDocumentosService } from '../../services/generaqrdocumentos.service';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { UtilMinjus } from '../../../../utils/util-minjus';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-genera-qr-documento',
  templateUrl: './genera-qr-documento.component.html',
  styleUrl: './genera-qr-documento.component.scss'
})
export class GeneraQrDocumentoComponent implements OnInit  {
  
  archivos: any = { texto: 'Adjuntar archivo', data: [] };
  pdfSrc: any;

  constructor(
    private generaQRDocumentosService: GeneraQRDocumentosService,
    private mensaje: MensajesService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
  }

  onValidar(): void {
    if (this.archivos?.data.length == 0) {
      this.mensaje.showMessageWarning('No hay archivos para validar');
      return;
    }

    this.mensaje.mostrarLoading();
    const urlQR='https://www.gob.pe/minjus';
    const tamanio=300;
    const startX=520;
    const startY=770;
    this.archivos.data.forEach((file: any, index: any) => {
      file.index = index;
      this.generaQRDocumentosService.generaQRDocumentos(file.file,tamanio,startX,startY,urlQR).subscribe({
        next: (res) => {
          if(file.index + 1 == this.archivos.data.length){           

            if(!res.dato){
              this.mensaje.showMessageWarning(res.message);
            }else{
              this.mensaje.cerrarLoading();
            }
          }          
          file.result = res;
          const blob = UtilMinjus.b64toBlob(res.dato, 'application/pdf');
          this.mostrarPDF(blob);

          console.log('data', this.archivos.data)
        },
        error: (err) => {
          this.mensaje.showMessageError(err);
        },
      });
    });
  }

  mostrarPDF(blob: Blob) {
    console.log(blob,"blob");
    const blobUrl = URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }


}
