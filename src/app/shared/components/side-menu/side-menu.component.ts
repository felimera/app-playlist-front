import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public codeMenu: string = '';

  public playlistMenu: MenuItem[] = [
    { title: 'User register', route: './auth/sign-up', code: 'A01' },
    { title: 'Login', route: './auth/login', code: 'A02' },
    { title: 'Music list registration', route: './playlist/register', code: 'P01' },
    { title: 'Play List', route: './playlist/list', code: 'P02' },
  ];

  public addTitle(code: string) {
    this.codeMenu = code;
  }

  public isSelectedItem(code: string): string {
    if (code !== this.codeMenu) {
      return 'nav-link';
    }
    return 'nav-link text-bg-dark';
  }
}
