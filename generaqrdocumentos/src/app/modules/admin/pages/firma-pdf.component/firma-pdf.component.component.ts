import { Component, OnInit } from '@angular/core';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { UploadFileService } from '../../services/upload-file.service';
import { UtilMinjus } from '../../../../core/utils/util-minjus';


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
  documento = 'example.pdf';
  preview='';
  localFile='';
  formato='';

  // Declaración del objeto JSON
  paragraphFormat: any = {
    font: ["Universal ",50],
    align: "right",
    format: [
      "Digitally Signed by $(CN)s",
      "O=$(O)s",
      "C=$(C)s",
      "S=$(S)s",
      "Date: $(date)s",
      "CustomField1: CustomValue1",
      "CustomField2: CustomValue2",
      "CustomField3: CustomValue3"
    ]
  };
/*
  [{"font" : [" Universal ",50],
    "align":"right",
    "format ": 
      [
        "Digitally Signed by $(CN)s",
        "O=$(O)s",
        "C=$(C)s",
        "S=$(S)s",
        "Date: $(date)s",
        "CustomField1: CustomValue1",
        "CustomField2: CustomValue2",
        " CustomField3: CustomValue3"
      ]
   }
  ]
    */

  constructor(
    private mensaje: MensajesService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private uploadFileService: UploadFileService,
    private mensajes: MensajesService,
  ) {}
  ngOnInit(): void {

    const form = document.getElementById('formFirma');
    form?.addEventListener('submit', this.enviarFormulario.bind(this));

    //this.documento='C:\\ejemplo-pdf.pdf';

    

    this.documento='https://drive.usercontent.google.com/download?id=1kOmur6oXvouOaBETr7AkF3U9x3Q9UXzE&export=download&authuser=0';
    //this.paragraphFormat=this.paragraphFormat;
    //this.preview='YES';
    //this.localFile='NO';

    this.formato = "[{ \"font\" : \n" +
    "                                        [\"Universal\",8],\"align\":\"right\",\n" +
    "                                        \"data_format\":{\"timezone\":\"America/Lima\",\n" +
    "                                        \"strtime\":\"%d/%m/%Y %H:%M:%S%z\"},\n" +
    "                                        \"format\":[\"Firmado digitalmente por :\",\"$(CN)s\",\n" +
    "                                        \"Motivo: $(Reason)s\",\n" +
    "                                        \"Localizacion: $(Location)s\",\n" +
    "                                        \"Fecha: $(date)s\",]}]";

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
        this.documento=file.file;
        //this.mostrarPDF(file.file);
    });
  }

  
  /*iniciarFirma(event: Event): void {
    console.log(event)
  }*/

  iniciarFirma(form: NgForm) {
    const formData = new FormData();

    // Agregar cada campo del formulario al FormData
    Object.keys(form.controls).forEach(key => {
      formData.append(key, form.controls[key].value);
    });

    this.http.post('http://localhost:7000/generaqrdocumentosbackend/firmaUploadServlet', formData)
      .subscribe((response: any) => {
        console.log('Respuesta del servidor:', response);
        if (response.status === 'success') {
          alert('Documento firmado con éxito. URL: ' + response.codigoAlfresco);
          console.log('Documento firmado con éxito. URL: ' , response.codigoAlfresco);
          this.onVerArchivo(response.codigoAlfresco);
          // Actualizar la UI según sea necesario
        } else {
          alert('Error al firmar el documento: ' + response.message);
          console.log('Error al firmar documento: ' , response.message);
        }
      }, error => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un error al procesar la firma.');
      });
    
  }
  
  
  enviarFormulario(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation(); // Detiene la propagación del evento

    const form = document.getElementById('formFirma') as HTMLFormElement;
    const formData = new FormData(form);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", form.action, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("Documento firmado exitosamente.");
        alert("Documento firmado exitosamente.");
      } else {
        console.error("Error al firmar el documento.");
        alert("Error al firmar el documento.");
      }
    };

    xhr.onerror = () => {
      console.error("Error en la conexión.");
      alert("Error en la conexión.");
    };

    xhr.send(formData);

    return false;
  }
  

  mostrarPDF(blob: Blob) {
    console.log(blob,"blob");
    const blobUrl = URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
  }


  onVerArchivo(code: any): void {
    const dato = { codigoArchivo: code };
    this.mensajes.mostrarLoading();
    this.uploadFileService.viewFileLibre(dato).subscribe({
      next: (res: any) => {

        this.mensajes.cerrarLoading();
        
        const resdato = res.dato;
        const blob = UtilMinjus.b64toBlob(resdato, 'application/pdf');

        this.mostrarPDF(blob);
        
      },
      error: (err) => {
        this.mensajes.showMessageErrorObservable(err);
      },
      complete: () => {},
    });
  }
  

}
