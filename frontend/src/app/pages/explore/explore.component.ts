import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatchService } from '../../core/services/match.service';
import { Skill, SkillSearchFilters, SkillSuggestion } from '../../core/models/skill.model';
import { SkillService } from '../../core/services/skill.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, FormsModule, SkillCardComponent, ModalComponent],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly levels: Skill['level'][] = ['Basico', 'Intermedio', 'Avanzado'];
  readonly modalities: Skill['modality'][] = ['Online', 'Presencial', 'Hibrido'];

  readonly filters: SkillSearchFilters = {
    query: '',
    category: '',
    modality: '',
    level: ''
  };

  skills: Skill[] = [];
  filteredSkills: Skill[] = [];
  categories: string[] = [];
  suggestions: SkillSuggestion[] = [];
  showSuggestions = false;
  selectedSkill: Skill | null = null;
  showRequestModal = false;
  statusMessage = '';
  searchEngineLabel = 'Busqueda lista';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly skillService: SkillService,
    private readonly matchService: MatchService
  ) {}

  ngOnInit(): void {
    this.skillService
      .getSkills()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((skills) => {
        this.skills = skills;
        this.categories = [...new Set(skills.map((skill) => skill.category))];
        this.filteredSkills = skills;
      });

    this.route.queryParamMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const query = params.get('q');
      const category = params.get('categoria');

      if (query !== null) {
        this.filters.query = query;
      }

      if (category !== null) {
        this.filters.category = category;
      }

      this.applyFilters();
    });

    this.skillService
      .getSearchStatus()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        this.searchEngineLabel = status.elasticsearchAvailable
          ? 'Busqueda con Elastic Cloud'
          : 'Elastic Cloud no disponible';
      });
  }

  onSearchInput(): void {
    this.applyFilters();
    this.loadSuggestions();
  }

  onFiltersChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters.query = '';
    this.filters.category = '';
    this.filters.modality = '';
    this.filters.level = '';
    this.statusMessage = '';
    this.suggestions = [];
    this.showSuggestions = false;
    this.router.navigate([], { relativeTo: this.route, queryParams: {} });
    this.applyFilters();
  }

  selectSuggestion(suggestion: SkillSuggestion): void {
    this.filters.query = suggestion.title;
    this.suggestions = [];
    this.showSuggestions = false;
    this.applyFilters();
  }

  hideSuggestions(): void {
    window.setTimeout(() => {
      this.showSuggestions = false;
    }, 120);
  }

  loadSuggestions(): void {
    this.skillService.getSuggestions(this.filters.query).subscribe((suggestions) => {
      this.suggestions = suggestions;
      this.showSuggestions = suggestions.length > 0;
    });
  }

  goToDetail(skillId: string): void {
    this.router.navigate(['/habilidad', skillId]);
  }

  openRequestModal(skill: Skill): void {
    this.selectedSkill = skill;
    this.showRequestModal = true;
  }

  closeRequestModal(): void {
    this.showRequestModal = false;
    this.selectedSkill = null;
  }

  confirmRequest(): void {
    if (!this.selectedSkill) {
      return;
    }

    const skill = this.selectedSkill;

    this.matchService.createRequest(skill).subscribe(() => {
      this.statusMessage = `Solicitud enviada a ${skill.userName}. Puedes revisar su estado en la pagina de Matches.`;
      this.closeRequestModal();
    });
  }

  private applyFilters(): void {
    this.skillService.searchSkills(this.filters).subscribe((skills) => {
      this.filteredSkills = skills;
    });
  }

}
