import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbUserModule,
  NbAccordionModule, NbIconModule, NbBadgeModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { GameComponent } from './components/game/game.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { EmptyGamesComponent } from './components/home/empty-games/empty-games.component';
import { ActiveGamesComponent } from './components/home/active-games/active-games.component';
import { FinishedGamesComponent } from './components/home/finished-games/finished-games.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    RegisterComponent,
    EmptyGamesComponent,
    ActiveGamesComponent,
    FinishedGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'corporate'}),
    NbLayoutModule,
    NbEvaIconsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NbUserModule,
    NbAccordionModule,
    NbIconModule,
    NbBadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
