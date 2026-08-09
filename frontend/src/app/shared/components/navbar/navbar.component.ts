import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Explorar', path: '/explorar' },
    { label: 'Publicar', path: '/publicar' },
    { label: 'Matches', path: '/matches' },
    { label: 'Perfil', path: '/perfil' },
    { label: 'Contacto', path: '/contacto' }
  ];

  readonly supportItems: NavItem[] = [
    { label: 'Privacidad', path: '/privacidad' },
    { label: 'Acerca de', path: '/acerca-de' },
    { label: 'Ayuda', path: '/ayuda' }
  ];

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
