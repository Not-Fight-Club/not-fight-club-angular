import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreComponent } from './store/store.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { HttpClientModule } from '@angular/common/http';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { ageValidatorDirective } from './shared/age-validator.directive';
import { FightComponent } from './fight/fight.component';
import { TimerComponent } from './timer/timer.component';
import { CharacterComponent } from './character/character/character.component';
import { HomeComponent } from './home/home.component';
import { ArchiveComponent } from './archive/archive.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BetsComponent } from './bets/bets.component';
import { FightListComponent} from './fight-list/fight-list.component'
import { ProductComponent } from './product/product.component';
import { UserPurchasesComponent } from './user/user-purchases/user-purchases.component';
import { CharacterPickerComponent } from './character/character-picker/character-picker.component';
import { OngoingfightsComponent } from './ongoingfights/ongoingfights.component';
import { VoteComponent } from './vote/vote.component';
import { PrivPubFightComponent } from './priv-pub-fight/priv-pub-fight.component';
import { NewFightComponent } from './new-fight/new-fight.component';
import { SeasonTimerComponent } from './season-timer/season-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    UserProfileComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    EditProfileComponent,
    UserListComponent,
    ageValidatorDirective,
    FightComponent,
    TimerComponent,
    CharacterComponent,
    HomeComponent,
    ArchiveComponent,
    BetsComponent,
    FightListComponent,
    ProductComponent,
    UserPurchasesComponent,
    VoteComponent,
    OngoingfightsComponent,
    PrivPubFightComponent,
    NewFightComponent,
    CharacterPickerComponent,
    SeasonTimerComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
