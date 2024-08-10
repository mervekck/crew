import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Crew } from '../models/crew.model';
import { CrewService } from '../services/crew.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-crew-card-page',
  templateUrl: './crew-card-page.component.html',
  styleUrls: ['./crew-card-page.component.css'],
})
export class CrewCardPageComponent implements OnInit {
  crew: Crew | undefined;

  constructor(
    private route: ActivatedRoute,
    private crewService: CrewService,
    private router: Router,
    private location: Location
  ) {}
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id'); // URL'den 'id' parametresini al
      const id = idParam ? +idParam : null; // 'id' parametresi varsa sayıya dönüştür, yoksa null ata
      if (id !== null) {
        this.crew = this.crewService.getCrewList().find((c) => c.id === id); // Crew detayını bul
      }
    });
  }
}
