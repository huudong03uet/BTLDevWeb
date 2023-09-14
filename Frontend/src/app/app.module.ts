import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './pages/pen/components/code-editor/code-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SettingComponent } from './pages/setting/setting.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PenHeaderComponent } from './pages/pen/components/header/header.component';
import { HomeCodeComponent } from './pages/pen/home-code.component';
import { TrendingComponent } from './pages/trending/trending.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PenHeaderComponent,
    CodeEditorComponent,
    LoginComponent,
    SignupComponent,
    SettingComponent,
    HomeCodeComponent,
    TrendingComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      // { path: '', component: CodeEditorComponent },
      { path: 'pen', component: HomeCodeComponent },
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "trending", component: TrendingComponent},
      { path: "", component: SignupComponent }
    ]),
    NgbModule,
    MatSidenavModule, 
    MatToolbarModule, 
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
