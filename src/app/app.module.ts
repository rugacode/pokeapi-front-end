import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { PokemonCardListComponent } from './modules/pokemon/pokemon-card-list/pokemon-card-list.component';
import { PokemonStickyTopComponent } from './modules/pokemon/pokemon-sticky-top/pokemon-sticky-top.component';
import { PokemonAbilitiesModalComponent } from './modules/pokemon/pokemon-abilities-modal/pokemon-abilities-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PokemonCardListComponent,
    PokemonStickyTopComponent,
    PokemonAbilitiesModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}