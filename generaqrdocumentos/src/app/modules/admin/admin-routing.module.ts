import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { VerifySignatureComponent } from './pages/verify-signature/verify-signature.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { GeneraQrDocumentoComponent } from './pages/genera-qr-documento/genera-qr-documento.component';
import { FirmaPdfComponentComponent } from './pages/firma-pdf.component/firma-pdf.component.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: PrincipalComponent },
      { path: 'verify-signature', component: VerifySignatureComponent },
      { path: 'genera-qr-documento', component: GeneraQrDocumentoComponent },
      { path: 'firmar-pdf', component: FirmaPdfComponentComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
