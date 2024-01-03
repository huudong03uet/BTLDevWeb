import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
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
import { ReactiveFormsModule } from '@angular/forms';

import { HeadProfileComponent } from './pages/profile/component/head-profile/head-profile.component';
import { PenProfileComponent } from './pages/profile/component/central-profile/pen-profile/pen-profile.component';
import { CollectionsProfileComponent } from './pages/profile/component/central-profile/collections-profile/collections-profile.component';
import { PopularPComponent } from './pages/profile/component/central-profile/pen-profile/popular-p/popular-p.component';
import { PublicPComponent } from './pages/profile/component/central-profile/pen-profile/public-p/public-p.component';
import { PrivatePComponent } from './pages/profile/component/central-profile/pen-profile/private-p/private-p.component';
import { LovedPComponent } from './pages/profile/component/central-profile/pen-profile/loved-p/loved-p.component';
import { CreateNewCollectionComponent } from './components/create-new-collection/create-new-collection.component'
import { MatDialogModule } from '@angular/material/dialog';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CommentAreaComponent } from './components/comment-area/comment-area.component';
import { PinnedCollectionComponent } from './components/pinned-collection/pinned-collection.component';
import { SupportComponent } from './pages/support/support.component';
import { TrendingCenterComponent } from './pages/trending/trending-center/trending-center.component';
import { ListItemGridCodeComponent } from './components/list-item-grid-code/list-item-grid-code.component';
import { YourWorkCollectionsComponent } from './pages/your-work/your-work-collections/your-work-collections.component';
import { YourWorkDeletedComponent } from './pages/your-work/your-work-deleted/your-work-deleted.component';
import { YourWorkPensComponent } from './pages/your-work/your-work-pens/your-work-pens.component';
import { FullOptionControlItemComponent } from './components/full-option-control-item/full-option-control-item.component';
import { SearchViewControlItemComponent } from './components/full-option-control-item/search-view-control-item/search-view-control-item.component';
import { GridListSortControlItemComponent } from './components/full-option-control-item/grid-list-sort-control-item/grid-list-sort-control-item.component';
import { ContentGridCodeFullInfComponent } from './components/content-grid-code-full-inf/content-grid-code-full-inf.component';
import { ContentGridCollectionFullInfComponent } from './components/content-grid-collection-full-inf/content-grid-collection-full-inf.component';
import { ReversePipe } from './pipes/reverse.pipe';
import { ProjectComponent } from './pages/project/project.component';
import { HeaderProjectComponent } from './pages/project/header-project/header-project.component';
import { FolderTreeComponent } from './pages/project/folder-tree/folder-tree.component';
import { ScreenCodeComponent } from './pages/project/screen-code/screen-code.component';
import { ScreenViewComponent } from './pages/project/screen-view/screen-view.component';
import { FooterProjectComponent } from './pages/project/footer-project/footer-project.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { DetailPenComponent } from './components/detail-pen/detail-pen.component';
import { CodeBoxProjectComponent } from './pages/project/screen-code/code-box-project/code-box-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCollectionToAddPenComponent } from './components/list-collection-to-add-pen/list-collection-to-add-pen.component';
import { PopularCComponent } from './pages/profile/component/central-profile/collections-profile/popular-c/popular-c.component';
import { PublicCComponent } from './pages/profile/component/central-profile/collections-profile/public-c/public-c.component';
import { PrivateCComponent } from './pages/profile/component/central-profile/collections-profile/private-c/private-c.component';
import { LovedCComponent } from './pages/profile/component/central-profile/collections-profile/loved-c/loved-c.component';
import { PopularProjectComponent } from './pages/profile/component/central-profile/project-profile/popular-project/popular-project.component';
import { PrivateProjectComponent } from './pages/profile/component/central-profile/project-profile/private-project/private-project.component';
import { LovedProjectComponent } from './pages/profile/component/central-profile/project-profile/loved-project/loved-project.component';
import { PublicProjectComponent } from './pages/profile/component/central-profile/project-profile/public-project/public-project.component';
import { ProjectProfileComponent } from './pages/profile/component/central-profile/project-profile/project-profile.component';
import { ListItemGridCodeFullInfComponent } from './components/list-item-grid-code-full-inf/list-item-grid-code-full-inf.component';
import { ListItemGridCollectionFullInfComponent } from './components/list-item-grid-collection-full-inf/list-item-grid-collection-full-inf.component';
import { ListItemGridProjectFullInfComponent } from './components/list-item-grid-project-full-inf/list-item-grid-project-full-inf.component';
import { ContentGridProjectFullInfComponent } from './components/content-grid-project-full-inf/content-grid-project-full-inf.component';
import { YourWorkProjectsComponent } from './pages/your-work/your-work-projects/your-work-projects.component';
import { CodeBoxDetailPenComponent } from './components/detail-pen/code-box-detail-pen/code-box-detail-pen.component';
import { ContentGridCollectionComponent } from './components/content-grid-collection/content-grid-collection.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListItemGridCollectionComponent } from './components/list-item-grid-collection/list-item-grid-collection.component';
import { ListItemGridProjectComponent } from './components/list-item-grid-project/list-item-grid-project.component';

import { ManageComponent } from './pages/manage/manage.component';
import { ActiveManageComponent } from './pages/manage/central-manage/active-manage/active-manage.component';
import { DeletedManageComponent } from './pages/manage/central-manage/deleted-manage/deleted-manage.component';
import { UserActiveComponent } from './pages/manage/central-manage/active-manage/user-active/user-active.component';
import { PenActiveComponent } from './pages/manage/central-manage/active-manage/pen-active/pen-active.component';
import { CollectionActiveComponent } from './pages/manage/central-manage/active-manage/collection-active/collection-active.component';
import { ProjectActiveComponent } from './pages/manage/central-manage/active-manage/project-active/project-active.component';
import { CommentActiveComponent } from './pages/manage/central-manage/active-manage/comment-active/comment-active.component';
import { PenDeletedComponent } from './pages/manage/central-manage/deleted-manage/pen-deleted/pen-deleted.component';
import { CommentDeletedComponent } from './pages/manage/central-manage/deleted-manage/comment-deleted/comment-deleted.component';
import { CentralManageComponent } from './pages/manage/central-manage/central-manage.component';
import { ProjectDeletedComponent } from './pages/manage/central-manage/deleted-manage/project-deleted/project-deleted.component';
import { UserDeletedComponent } from './pages/manage/central-manage/deleted-manage/user-deleted/user-deleted.component';
import { CollectionDeletedComponent } from './pages/manage/central-manage/deleted-manage/collection-deleted/collection-deleted.component';
import { ListPenCollectionProjectSComponent } from './pages/manage/central-manage/components/list-pen-collection-project-s/list-pen-collection-project-s.component';
import { ListCommentsComponent } from './pages/manage/central-manage/components/list-comments/list-comments.component';
import { ListUsersComponent } from './pages/manage/central-manage/components/list-users/list-users.component';

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
    LovedPComponent,
    PopularCComponent,
    PublicCComponent,
    PrivateCComponent,
    LovedCComponent,
    PopularProjectComponent,
    PublicProjectComponent,
    PrivateProjectComponent,
    LovedProjectComponent,
    ProjectProfileComponent,
    CreateNewCollectionComponent,
    PageNotFoundComponent,
    CommentAreaComponent,
    PinnedCollectionComponent,
    SupportComponent,
    TrendingCenterComponent,
    ListItemGridCodeComponent,
    YourWorkCollectionsComponent,
    YourWorkDeletedComponent,
    YourWorkPensComponent,
    FullOptionControlItemComponent,
    SearchViewControlItemComponent,
    GridListSortControlItemComponent,
    ContentGridCodeFullInfComponent,
    ContentGridCollectionFullInfComponent,
    ReversePipe,
    ProjectComponent,
    HeaderProjectComponent,
    FolderTreeComponent,
    ScreenCodeComponent,
    ScreenViewComponent,
    FooterProjectComponent,
    CreateNewProjectComponent,
    DetailPenComponent,
    CodeBoxProjectComponent,
    ListCollectionToAddPenComponent,
    ListItemGridCodeFullInfComponent,
    ListItemGridCollectionFullInfComponent,
    ListItemGridProjectFullInfComponent,
    ContentGridProjectFullInfComponent,
    YourWorkProjectsComponent,
    CodeBoxDetailPenComponent,
    ContentGridCollectionComponent,
    SearchPageComponent,
    ListItemGridCollectionComponent,
    ListItemGridProjectComponent,
    ManageComponent,
    ActiveManageComponent,
    DeletedManageComponent,
    UserActiveComponent,
    PenActiveComponent,
    CollectionActiveComponent,
    ProjectActiveComponent,
    CommentActiveComponent,
    PenDeletedComponent,
    CommentDeletedComponent,
    ProjectDeletedComponent,
    UserDeletedComponent,
    CentralManageComponent,
    CollectionDeletedComponent,
    ListPenCollectionProjectSComponent,
    ListCommentsComponent,
    ListUsersComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: { title: 'CODE' } },
      // { path: '', component: CodeEditorComponent },
      { path: 'pen/:id', component: HomeCodeComponent, data: { title: 'A Pen of you - Nhom XXX' } },
      { path: 'collection/:id', component: CollectionComponent, data: { title: 'Collection - Nhom XXX' }, },
      { path: 'pen', component: HomeCodeComponent },
      { path: "login", component: LoginComponent, data: { title: 'Đăng nhập - Nhom XXX' } },
      { path: "signup", component: SignupComponent },
      { path: "trending", component: TrendingComponent },
      { path: "following", component: FollowingComponent },
      { path: "your-work", component: YourWorkComponent },
      {path: "search-page", component: SearchPageComponent},
      { path: "project/123", component: ProjectComponent },
      {
        path: "profile", component: ProfileComponent, children: [
          { path: "", redirectTo: "pens", pathMatch: "full" },
          {
            path: "pens", component: CentralProfileComponent, children: [
              { path: "", redirectTo: "popular", pathMatch: "full" },
              { path: "popular", component: PopularPComponent },
              { path: "public", component: PublicPComponent },
              { path: "private", component: PrivatePComponent },
              { path: "loved", component: LovedPComponent },

            ]
          },
          {
            path: "collections", component: CentralProfileComponent, children: [
              { path: "", redirectTo: "popular", pathMatch: "full" },
              { path: "popular", component: CollectionsProfileComponent },
              { path: "private", component: CollectionsProfileComponent },
              { path: "public", component: CollectionsProfileComponent },
              { path: "loved", component: CollectionsProfileComponent }

            ]
          },
          {
            path: "projects", component: CentralProfileComponent, children: [
              { path: "", redirectTo: "popular", pathMatch: "full" },
              { path: "popular", component: PopularProjectComponent },
              { path: "private", component: PrivateProjectComponent },
              { path: "public", component: PublicProjectComponent },
              { path: "loved", component: LovedProjectComponent }

            ]
          }

        ]
      },
      {
        path: "manage", component: ManageComponent, children: [
          { path: "", redirectTo: "active", pathMatch: "full" },
          {
            path: "active", component: ActiveManageComponent, children: [
              { path: "", redirectTo: "users", pathMatch: "full" },
              { path: "users", component: UserActiveComponent },
              { path: "pens", component: PenActiveComponent },
              { path: "collections", component: CollectionActiveComponent },
              { path: "projects", component: ProjectActiveComponent },
              { path: "comments", component: CommentActiveComponent },
            ]
          },
          {
            path: "deleted", component: DeletedManageComponent, children: [
              { path: "", redirectTo: "users", pathMatch: "full" },
              { path: "users", component: UserDeletedComponent },
              { path: "pens", component: PenDeletedComponent },
              { path: "collections", component: CollectionDeletedComponent },
              { path: "comments", component: CommentDeletedComponent },
              { path: "projects", component: ProjectDeletedComponent },
            ]
          }
        ]
      },
      { path: "trending", component: TrendingComponent },
      { path: "following", component: FollowingComponent },
      {
        path: "your-work", component: YourWorkComponent, children: [
          { path: "", redirectTo: "pens", pathMatch: "full" },
          { path: "pens", component: YourWorkPensComponent },
          { path: "collections", component: YourWorkCollectionsComponent },
          { path: "projects", component: YourWorkProjectsComponent},
          { path: "deleted", component: YourWorkDeletedComponent }
        ]
      },
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
      {
        path: "support", component: SupportComponent
      },
      {
        path: "test", component: ListCollectionToAddPenComponent
      },
      { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
    ]),
    NgbModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
