import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('en'); // Varsayılan dili ayarlayın
  }

  ngOnInit() {
    // Tarayıcı tarafında localStorage kullanılabilir, SSR sırasında çalışmaz
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') || 'en';
      this.translateService.use(savedLang); // Kaydedilen dili kullan
    }
  }
  title = 'multi_lang';
}
