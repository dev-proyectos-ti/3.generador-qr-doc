import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminConstants } from '../../../../constants/AdminConstants';
import { MensajesService } from '../../../../core/services/mensajes.service';
import { FormValidationUtils } from '../../../../utils/form-validation-utils';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-load-file',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    MatAccordion,
    MatExpansionModule,
    MatDividerModule,
  ],
  templateUrl: './load-file.component.html',
  styleUrl: './load-file.component.scss',
})
export class LoadFileComponent implements OnInit {
  @Input() objeto: any = null;
  frmValidationUtils!: FormValidationUtils;

  fileConfig: any = AdminConstants.fileConfig?.default;

  firmux = AdminConstants.firmux;
  info = AdminConstants.info;

  constructor(private mensajes: MensajesService) {}

  ngOnInit(): void {}

  onCargarArchivo(event: any): void {
    this.onLimpiar();
    this.mensajes.mostrarLoading();

    const files = event.target.files;
    if (files.length === 0) {
      this.mensajes.cerrarLoading();
      return;
    }
    const cantidadArchivos = files.length;
    for (let i = 0; i < cantidadArchivos; i++) {
      const file = files[`${i}`];

      const resFormat = FormValidationUtils.isFormatFile(
        file,
        this.fileConfig?.tipoArchivos.split(',')
      );
      if (resFormat?.error) {
        this.mensajes.showMessageWarning(resFormat.message);
        files;
        continue;
      }

      const resSize = FormValidationUtils.isSizeFileConfig(
        file,
        this.fileConfig?.tamanoArchivo,
        this.fileConfig?.tamanoArchivosText
      );
      if (resSize?.error) {
        this.mensajes.showMessageWarning(resSize.message);
        continue;
      }
      this.objeto.data.push({ file: file, result: null, index: null });
    }

    this.mensajes.cerrarLoading();
  }

  onEliminarArchivo(element: any): void {
    const index = this.objeto?.data.findIndex((x: any) => x == element);

    if (index >= 0) {
      this.objeto?.data.splice(index, 1);
    }
  }

  onValidar(): void {}

  onLimpiar(): void {
    if (this.objeto?.data?.length > 0) {
      this.objeto.data = [];
    }
  }

  onVerArchivo(file: any): void {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
    URL.revokeObjectURL(fileURL);
  }

  getStatus(status: any): any {
    switch (status) {
      case this.firmux.firmuxOk:
        return 'text-minjus_success';
      case this.firmux.firmuxError:
        return 'text-minjus_danger';
      case this.firmux.firmuxDesconocido:
        return 'text-minjus_warning';
      default:
        return 'text-minjus_warning';
    }
  }

  getIcon(status: any): any {
    switch (status) {
      case this.firmux.firmuxOk:
        return 'check_circle';
      case this.firmux.firmuxError:
        return 'error';
      case this.firmux.firmuxDesconocido:
        return 'fmd_bad';
      default:
        return 'fmd_bad';
    }
  }
}
