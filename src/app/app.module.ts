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
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { VuePenComponent } from './vue-pen/vue-pen.component';
import { YourWorkComponent } from './your-work/your-work.component';
import { AssetsComponent } from './assets/assets.component';
import { SearchComponent } from './home/search/search.component';
import { BodyHomeComponent } from './home/body-home/body-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    CodeEditorComponent,
    LoginComponent,
    SigninComponent,
    SettingComponent,
    HomeCodeComponent,
    SidebarComponent,
    VuePenComponent,
    YourWorkComponent,
    AssetsComponent,
    SearchComponent,
    BodyHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: {title: 'CodePen'} },
      { path: 'pen', component: HomeCodeComponent, data: {title: 'A Pen of you - Nhom XXX'} },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: "login", component: LoginComponent, data: {title: 'Đăng nhập - Nhom XXX'}},
      { path: "signin", component: SigninComponent, data: {title: 'Đăng ký - Nhom XXX'} },
      { path: "vue", component: VuePenComponent, data: {title: 'Vue - Nhom XXX'} },
      { path: "your-work", component: YourWorkComponent, data: {title: 'Your Work - Nhom XXX'} },
      { path: "", component: SigninComponent }
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
