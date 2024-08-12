import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SignatureService } from '../../services/signature.service';

@Component({
  selector: 'app-firma-pdf.component',
  templateUrl: './firma-pdf.component.component.html',
  styleUrl: './firma-pdf.component.component.scss'
})
export class FirmaPdfComponentComponent implements OnInit  {
  archivos: any = { texto: 'Adjuntar archivo', data: [] };
  pdfSrc: any;

  documentName = 'example.pdf';
  documentID = 'example123';
  type = 'PAdES'; // Tipo de firma

  constructor(
    private mensaje: MensajesService,
    private sanitizer: DomSanitizer,
    private signatureService: SignatureService,
  ) {}

  ngOnInit(): void {
  }

  onVerPDF(): void {
      if (this.archivos?.data.length == 0) {
        this.mensaje.showMessageWarning('No hay archivos para visualizar');
        return;
      }
    
      this.archivos.data.forEach((file: any, index: any) => {
        file.index = index;         
            //const blob = UtilMinjus.b64toBlob(file.file, 'application/pdf');
            this.mostrarPDF(file.file);
      });
  }

  onFirmarPDF(): void {
    if (this.archivos?.data.length == 0) {
      this.mensaje.showMessageWarning('No hay archivos para firmar');
      return;
    }
  
    this.archivos.data.forEach((file: any, index: any) => {
        file.index = index;         
        //const blob = UtilMinjus.b64toBlob(file.file, 'application/pdf');
        this.mostrarPDF(file.file);
    });
  }

  
  initiateSigning() {
    this.signatureService.signDocument({
      documentName: this.documentName,
      documentID: this.documentID,
      type: this.type,
      documentPath: 'D:\\Carta-Ejemplo.pdf' // Ruta del archivo PDF estático
    });
  }

  sendForm(event: Event): void {
    const form = event.target as HTMLFormElement;
    const formData = new FormData();

    // Agrega los valores del formulario a FormData
    const documentUrl = form.querySelector('.bit4id-document')?.textContent || '';
    const documentName = form.querySelector('.bit4id-documentName')?.textContent || '';
    const signatureType = form.querySelector('.bit4id-signatureType')?.textContent || '';
    const signingAlgorithm = form.querySelector('.bit4id-signingAlgorithm')?.textContent || '';
    const certInfo = form.querySelector('.bit4id-certInfo')?.textContent || '';
    const cmd = 'Sign Document';
    const id = form.querySelector('#bit4id-status')?.textContent || '';

    console.log('documentUrl', documentUrl);
    console.log('documentName', documentName);
    console.log('signatureType', signatureType);
    console.log('signingAlgorithm', signingAlgorithm);
    console.log('certInfo', certInfo);
    console.log('cmd', cmd);
    console.log('id', id);

    formData.append('documentUrl', documentUrl);
    formData.append('documentName', documentName);
    formData.append('signatureType', signatureType);
    formData.append('signingAlgorithm', signingAlgorithm);
    formData.append('certInfo', certInfo);
    formData.append('cmd', cmd);
    formData.append('id', id);

    // Enviar el formulario al backend usando HttpClient
    console.log(formData);
  }

  

  mostrarPDF(blob: Blob) {
    console.log(blob,"blob");
    const blobUrl = URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }

}
