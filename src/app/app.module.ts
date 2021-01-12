import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {FooterComponent} from './layout/footer/footer.component';
import {PageLayoutComponent} from './layout/page-layout/page-layout.component';
import {HomeModule} from './modules/home/home.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PageLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
