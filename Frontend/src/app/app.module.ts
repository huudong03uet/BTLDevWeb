import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { CodeEditorComponent } from './pages/pen/components/code-editor/code-editor.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PenHeaderComponent } from './pages/pen/components/header/header.component';
import { HomeCodeComponent } from './pages/pen/home-code.component';
import { TrendingComponent } from './pages/trending/trending.component';
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
import { ContentGridCodeComponent } from './components/content-grid-code/content-grid-code.component';
import { SidebarNologinComponent } from './components/sidebar-nologin/sidebar-nologin.component';
import { HeaderNologinComponent } from './components/header-nologin/header-nologin.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CentralProfileComponent } from './pages/profile/component/central-profile/central-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountSettingsComponent } from './pages/settings/components/account-settings/account-settings.component';
import { ProfileSettingsComponent } from './pages/settings/components/profile-settings/profile-settings.component';
import { BillingSettingsComponent } from './pages/settings/components/billing-settings/billing-settings.component';
import { NotificationsSettingsComponent } from './pages/settings/components/notifications-settings/notifications-settings.component';
import { PrivacySettingsComponent } from './pages/settings/components/privacy-settings/privacy-settings.component';
import { EditorPreferencesSettingsComponent } from './pages/settings/components/editor-preferences-settings/editor-preferences-settings.component';
import { ContentPreferencesSettingsComponent } from './pages/settings/components/content-preferences-settings/content-preferences-settings.component';
import { CollectionComponent } from './pages/collection/collection.component';

import { HeadProfileComponent } from './pages/profile/component/head-profile/head-profile.component';
import { PenProfileComponent } from './pages/profile/component/central-profile/pen-profile/pen-profile.component';
import { CollectionsProfileComponent } from './pages/profile/component/central-profile/collections-profile/collections-profile.component';
import { PopularPComponent } from './pages/profile/component/central-profile/pen-profile/popular-p/popular-p.component';
import { PublicPComponent } from './pages/profile/component/central-profile/pen-profile/public-p/public-p.component';
import { PrivatePComponent } from './pages/profile/component/central-profile/pen-profile/private-p/private-p.component';
import { TemplatePComponent } from './pages/profile/component/central-profile/pen-profile/template-p/template-p.component';
import { ForkedPComponent } from './pages/profile/component/central-profile/pen-profile/forked-p/forked-p.component';
import { LovedPComponent } from './pages/profile/component/central-profile/pen-profile/loved-p/loved-p.component';
import { TaggedPComponent } from './pages/profile/component/central-profile/pen-profile/tagged-p/tagged-p.component';
import { PopularCComponent } from './pages/profile/component/central-profile/collections-profile/popular-c/popular-c.component';
import { PublicCComponent } from './pages/profile/component/central-profile/collections-profile/public-c/public-c.component';
import { PrivateCComponent } from './pages/profile/component/central-profile/collections-profile/private-c/private-c.component';
import { LovedCComponent } from './pages/profile/component/central-profile/collections-profile/loved-c/loved-c.component';
import { ShowcasePComponent } from './pages/profile/component/central-profile/pen-profile/showcase-p/showcase-p.component';
import { CreateNewCollectionComponent } from './components/create-new-collection/create-new-collection.component'
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PenHeaderComponent,
    CodeEditorComponent,
    LoginComponent,
    SignupComponent,
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
    SettingsComponent,
    AccountSettingsComponent,
    ProfileSettingsComponent,
    BillingSettingsComponent,
    NotificationsSettingsComponent,
    PrivacySettingsComponent,
    EditorPreferencesSettingsComponent,
    ContentPreferencesSettingsComponent,
    CollectionComponent,
    HeadProfileComponent,
    PenProfileComponent,
    CollectionsProfileComponent,
    PopularPComponent,
    PublicPComponent,
    PrivatePComponent,
    TemplatePComponent,
    ForkedPComponent,
    LovedPComponent,
    TaggedPComponent,
    PopularCComponent,
    PublicCComponent,
    PrivateCComponent,
    LovedCComponent,
    ShowcasePComponent,
    CreateNewCollectionComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: { title: 'CODE' } },
      // { path: '', component: CodeEditorComponent },
      { path: 'pen/:id', component: HomeCodeComponent, data: { title: 'A Pen of you - Nhom XXX' } },
      {path: 'collection/:id', component: CollectionComponent, data: { title: 'Collection - Nhom XXX' },},
      { path: 'pen', component: HomeCodeComponent },
      { path: "login", component: LoginComponent, data: { title: 'Đăng nhập - Nhom XXX' } },
      { path: "signup", component: SignupComponent },
      { path: "trending", component: TrendingComponent},
      {path: "following", component: FollowingComponent},
      {path: "your-work", component: YourWorkComponent},
      {path: "profile", component: ProfileComponent, children: [
        {path: "", redirectTo: "pens", pathMatch: "full"},
        {path: "pens", component: CentralProfileComponent, children: [
          {path: "", redirectTo: "showcase", pathMatch: "full"},
          {path: "showcase", component: ShowcasePComponent},
          {path: "popular", component: PopularPComponent},
          {path: "public", component: PublicPComponent},
          {path: "private", component: PrivatePComponent},
          {path: "template", component: TemplatePComponent},
          {path: "forked", component: ForkedPComponent},
          {path: "loved", component: LovedPComponent},
          {path: "tags", component: TaggedPComponent}

        ]},
        {path: "collections", component: CentralProfileComponent, children: [
          {path: "", redirectTo: "popular", pathMatch: "full"},
          {path: "popular", component: CollectionsProfileComponent},
          {path: "private", component: CollectionsProfileComponent},
          {path: "public", component: CollectionsProfileComponent},
          {path: "loved", component: CollectionsProfileComponent}

        ]}
      ]},
      {path: "trending", component: TrendingComponent},
      { path: "following", component: FollowingComponent },
      { path: "your-work", component: YourWorkComponent },
      // {path: "settings", component: SettingsComponent}
      //  if path -> settings/profile, settings/account, settings/notifications,... => component: SettingsComponent
      {
        path: "settings", component: SettingsComponent, children: [
          { path: "", redirectTo: "profile", pathMatch: "full" },
          { path: "profile", component: ProfileSettingsComponent },
          { path: "account", component: AccountSettingsComponent },
          { path: "billing", component: BillingSettingsComponent },
          { path: "notifications", component: NotificationsSettingsComponent },
          { path: "privacy", component: PrivacySettingsComponent },
          { path: "editor-preferences", component: EditorPreferencesSettingsComponent },
          { path: "content-preferences", component: ContentPreferencesSettingsComponent },
        ]
      },
      { path: '**', pathMatch: 'full',  component: PageNotFoundComponent }, 
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
