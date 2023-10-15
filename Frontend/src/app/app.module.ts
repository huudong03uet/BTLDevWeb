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
// import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { FollowingComponent } from './pages/following/following.component';
import { ContentGridUserComponent } from './components/content-grid-user/content-grid-user.component';
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { SearchComponent } from './components/search/search.component';
import { BodyFollowingTrendingComponent } from './components/body-following-trending/body-following-trending.component';
import { FooterComponent } from './components/footer/footer.component';
import { FollowingCenterComponent } from './pages/following/following-center/following-center.component';
import { HomeCenterComponent } from './pages/home/components/home-center/home-center.component';
import { CodeBoxComponent } from './pages/home/components/code-box/code-box.component';
import { YourWorkComponent } from './pages/your-work/your-work.component';
import { ContentGridCodeComponent} from './components/content-grid-code/content-grid-code.component';
import { SidebarNologinComponent } from './components/sidebar-nologin/sidebar-nologin.component';
import { HeaderNologinComponent } from './components/header-nologin/header-nologin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CentralProfileComponent } from './pages/profile/central-profile/central-profile.component';


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
    FollowingComponent,
    ContentGridUserComponent,
    SearchComponent,
    BodyFollowingTrendingComponent,
    FooterComponent,
    FollowingCenterComponent,
    HomeCenterComponent,
    CodeBoxComponent,
    YourWorkComponent,
    ContentGridCodeComponent,
    SidebarNologinComponent,
    HeaderNologinComponent,
    ProfileComponent,
    CentralProfileComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: {title: 'CodePen'} },
      // { path: '', component: CodeEditorComponent },
      { path: 'pen/:id', component: HomeCodeComponent, data: {title: 'A Pen of you - Nhom XXX'} },
      { path: 'pen', component: HomeCodeComponent },
      { path: "login", component: LoginComponent, data: {title: 'Đăng nhập - Nhom XXX'}},
      { path: "signup", component: SignupComponent },
      { path: "trending", component: TrendingComponent},
      {path: "following", component: FollowingComponent},
      {path: "your-work", component: YourWorkComponent},
      {path: "profile", component: ProfileComponent}
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
