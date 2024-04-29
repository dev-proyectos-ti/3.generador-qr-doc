import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { AdminComponent } from './modules/admin/admin.component';
import { DialogConfirmationComponent } from './core/dialog-confirmation/dialog-confirmation.component';
import { DialogLoadingComponent } from './core/dialog-loading/dialog-loading.component';
import { DialogOverviewComponent } from './core/dialog-overview/dialog-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButton, MatButtonModule } from '@angular/material/button';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
  useHash: true,
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PageNotFoundComponent,

    DialogOverviewComponent,
    DialogLoadingComponent,
    DialogConfirmationComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, routerConfig),
    BrowserAnimationsModule,

    AdminModule,

    MatToolbarModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDivider,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
