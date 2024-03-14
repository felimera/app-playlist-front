import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayListRoutingModule } from './play-list-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';


@NgModule({
  declarations: [
    RegisterPageComponent,
    ListPageComponent
  ],
  imports: [
    CommonModule,
    PlayListRoutingModule
  ]
})
export class PlayListModule { }
