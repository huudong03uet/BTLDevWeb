import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './pages/pen/components/code-editor/code-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './pages/pen/components/header/header.component';
import { HomeCodeComponent } from './pages/pen/home-code.component';

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
