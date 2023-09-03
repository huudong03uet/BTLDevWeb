import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { SettingComponent } from './setting/setting.component';
import { HomeCodeComponent } from './home-code/home-code.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CodeEditorComponent,
    LoginComponent,
    SigninComponent,
    SettingComponent,
    HomeCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      // { path: '', component: CodeEditorComponent },
      { path: 'pen', component: HomeCodeComponent },
      { path: "login", component: LoginComponent },
      { path: "signin", component: SigninComponent },
      { path: "", component: SigninComponent }
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
