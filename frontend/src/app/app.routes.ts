import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { HelpComponent } from './pages/help/help.component';
import { HomeComponent } from './pages/home/home.component';
import { MatchesComponent } from './pages/matches/matches.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { PublishSkillComponent } from './pages/publish-skill/publish-skill.component';
import { SkillDetailComponent } from './pages/skill-detail/skill-detail.component';
import { WearableDemoComponent } from './pages/wearable-demo/wearable-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SkillSwap | Inicio' },
  { path: 'explorar', component: ExploreComponent, title: 'SkillSwap | Explorar habilidades' },
  { path: 'habilidad/:id', component: SkillDetailComponent, title: 'SkillSwap | Detalle de habilidad' },
  { path: 'publicar', component: PublishSkillComponent, title: 'SkillSwap | Publicar habilidad' },
  { path: 'matches', component: MatchesComponent, title: 'SkillSwap | Matches' },
  { path: 'perfil', component: ProfileComponent, title: 'SkillSwap | Perfil' },
  { path: 'wearable', component: WearableDemoComponent, title: 'SkillSwap | Wearable demo' },
  { path: 'contacto', component: ContactComponent, title: 'SkillSwap | Contacto' },
  { path: 'privacidad', component: PrivacyComponent, title: 'SkillSwap | Privacidad' },
  { path: 'acerca-de', component: AboutComponent, title: 'SkillSwap | Acerca de' },
  { path: 'ayuda', component: HelpComponent, title: 'SkillSwap | Ayuda' },
  { path: '**', component: NotFoundComponent, title: 'SkillSwap | No encontrado' }
];
