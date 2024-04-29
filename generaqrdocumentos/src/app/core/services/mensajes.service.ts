import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { enumTipoMensaje } from '../enums/enum-tipo-mensaje.enum';
import { AuthJWTService } from './auth.service';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { DialogLoadingComponent } from '../dialog-loading/dialog-loading.component';
import { DialogConfirmationComponent } from '../dialog-confirmation/dialog-confirmation.component';

@Injectable({
    providedIn: 'root',
})
export class MensajesService {
    dialogLoading!: MatDialogRef<any>;

    constructor(
        public dialog: MatDialog,
        private helpersAutenticacion: AuthJWTService
    ) {}

    showMessageSuccess(
        content: string = 'Se ha ejecutado la acción correctamente'
    ): void {
        this.cerrarLoading();
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            panelClass: 'dialog-general',
            disableClose: true,
            data: {
                title: 'INFORMACIÓN',
                content: content,
                tipoMensaje: enumTipoMensaje.INFORMACION,
            },
        });
    }

    showMessageWarning(content: string): void {
        this.cerrarLoading();
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            panelClass: 'dialog-general',
            disableClose: true,
            data: {
                title: 'ADVERTENCIA',
                content: content,
                tipoMensaje: enumTipoMensaje.ADVERTENCIA,
            },
        });
    }

    showMessageError(content: string): void {
        this.cerrarLoading();
        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            panelClass: 'dialog-general',
            disableClose: true,
            data: {
                title: 'ERROR',
                content: content,
                tipoMensaje: enumTipoMensaje.ERROR,
            },
        });
    }

    showMessageErrorObservable(error: any): void {
        this.cerrarLoading();
        let tipoMensaje = enumTipoMensaje.ADVERTENCIA;

        if(error?.error?.estado == -3){
            tipoMensaje = enumTipoMensaje.TOKEN;
        }

        const dialogRef = this.dialog.open(DialogOverviewComponent, {
            panelClass: 'dialog-general',
            disableClose: true,
            data: {
                title: 'ERROR',
                content: error.error.mensaje,
                tipoMensaje: tipoMensaje,
            },
        });
    }

    mostrarLoading(): void {
        this.dialogLoading = this.dialog.open(DialogLoadingComponent, {
            panelClass: 'dialog-general',
            disableClose: true,
            width: '200px',
        });
    }

    cerrarLoading(): void {
        if(this.dialogLoading){
            this.dialogLoading.close();
        }
    }

    crearConfirmacion(contentConfirmation: any): MatDialogRef<DialogConfirmationComponent>{
        return this.dialog.open(DialogConfirmationComponent, {
            panelClass: 'confirmation-general',
            disableClose: true,
            data: { content: contentConfirmation },
        });
    }
}
