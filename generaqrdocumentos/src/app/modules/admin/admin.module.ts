import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifySignatureComponent } from './pages/verify-signature/verify-signature.component';
import { AdminRoutingModule } from './admin-routing.module';
import { PrincipalComponent } from './pages/principal/principal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoadFileComponent } from '../transversal/components/load-file/load-file.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GeneraQrDocumentoComponent } from './pages/genera-qr-documento/genera-qr-documento.component';
import { FirmaPdfComponentComponent } from './pages/firma-pdf.component/firma-pdf.component.component';



@NgModule({
  declarations: [
    VerifySignatureComponent,
    PrincipalComponent,
    GeneraQrDocumentoComponent,
    FirmaPdfComponentComponent
  ],
  imports: [
    CommonModule,

    AdminRoutingModule,
    HttpClientModule,

    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDivider,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,

    LoadFileComponent
  ]
})
export class AdminModule { }
