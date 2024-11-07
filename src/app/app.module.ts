import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDateNativeAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideNgxLocalstorage } from 'ngx-localstorage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddWeightEntryComponent } from './features/add-weight-entry/add-weight-entry.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { GlobalConstants } from './shared/global-constants';

@NgModule({
  declarations: [AppComponent, AddWeightEntryComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideNgxLocalstorage({
      prefix: GlobalConstants.localStorageKeyPrefix,
      delimiter: '@',
    }),
    NgbDateNativeAdapter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
