import { Component, OnInit } from '@angular/core';
import { VerifySignatureService } from '../../services/verify-signature.service';
import { MensajesService } from '../../../../core/services/mensajes.service';

@Component({
  selector: 'app-verify-signature',
  templateUrl: './verify-signature.component.html',
  styleUrl: './verify-signature.component.scss',
})
export class VerifySignatureComponent implements OnInit {
  archivos: any = { texto: 'Adjuntar archivos a validar', data: [] };

  constructor(
    private verifySignatureService: VerifySignatureService,
    private mensaje: MensajesService
  ) {}

  ngOnInit(): void {
  }

  onValidar(): void {
    if (this.archivos?.data.length == 0) {
      this.mensaje.showMessageWarning('No hay archivos para validar');
      return;
    }

    this.mensaje.mostrarLoading();
    this.archivos.data.forEach((file: any, index: any) => {
      file.index = index;
      this.verifySignatureService.verifySignature(file.file).subscribe({
        next: (res) => {
          if(file.index + 1 == this.archivos.data.length){           

            if(!res.dato){
              this.mensaje.showMessageWarning(res.message);
            }else{
              this.mensaje.cerrarLoading();
            }
          }          
          file.result = res;

          console.log('data', this.archivos.data)
        },
        error: (err) => {
          this.mensaje.showMessageError(err);
        },
      });
    });
  }
}
