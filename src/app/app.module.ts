import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './pages/code-editor/components/header/header.component';
import { CodeEditorComponent } from './pages/code-editor/code-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SettingComponent } from './pages/setting/setting.component';
import { HomeCodeComponent } from './pages/home-code/home-code.component';
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
