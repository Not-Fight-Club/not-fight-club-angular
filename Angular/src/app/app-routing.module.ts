import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { StoreComponent } from './store/store.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CharacterComponent } from './character/character/character.component';
import { HomeComponent } from './home/home.component';
import { FightComponent } from './fight/fight.component';
import { ArchiveComponent } from './archive/archive.component';
import { BetsComponent } from './bets/bets.component'
import { ProductComponent } from './product/product.component';
import { OngoingfightsComponent } from './ongoingfights/ongoingfights.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'store', component: StoreComponent},
  { path: 'edit-profile/:userId', component: EditProfileComponent },
  { path: 'home', component: HomeComponent },
  { path: 'fight/:fightId', component: FightComponent },
  { path: 'fight', component: FightComponent },
  { path: 'fights', component: OngoingfightsComponent },
  { path: 'archive', component: ArchiveComponent },

  { path: 'bets', component: BetsComponent },

  { path: 'product', component: ProductComponent},

  //turn off authguard so we can manually access all components. --briana
  //turn it back on for finished project by uncommenting lines below --briana

  //{ path: 'character', component: CharacterComponent, canActivate: [AuthGuard] },
  //{ path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  //{ path: 'store', component: StoreComponent, canActivate: [AuthGuard] },
  //{ path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  //{ path: 'users/:userId', component: UserProfileComponent, canActivate: [AuthGuard] },

  //remove this code for finished project -- briana
  { path: 'character', component: CharacterComponent },
  { path: 'chat', component: ChatComponent},
  { path: 'store', component: StoreComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/:userId', component: UserProfileComponent},

  //remove this code for finished project --briana




  { path: '**', component: HomeComponent }
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
