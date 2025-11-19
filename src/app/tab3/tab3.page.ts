import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WeatherService } from '../services/weather.service';
import { NgIf } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, ExploreContainerComponent, NgIf],
})
export class Tab3Page {
  embedUrl: SafeResourceUrl | null = null;
  defaultPlace = 'Manali, India';

  // basic list of destinations to show weather for (can be changed)
  destinations: string[] = ['Paris', 'London', 'New York', 'Tokyo', 'Manali', 'Goa', 'Agra'];

  weatherMap: Record<string, { current?: any; forecast?: any[]; error?: string }> = {};

  constructor(private sanitizer: DomSanitizer, private weather: WeatherService) {
    this.setEmbedForPlace(this.defaultPlace);
  }

  ngOnInit(): void {
    // fetch weather for each destination when tab opens
    this.loadWeatherForAll();
  }

  setEmbedForPlace(place: string) {
    const url = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
    this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openMap(query?: string) {
    // default location (Manali) if no query provided
    const place = query ? query : this.defaultPlace;
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
    window.open(url, '_blank');
  }

  loadWeatherForAll() {
    if (!this.weather.hasKey()) {
      // mark error for all
      for (const d of this.destinations) {
        this.weatherMap[d] = { error: 'OpenWeather API key missing (set openWeatherConfig.apiKey in environment.ts)' };
      }
      return;
    }

    for (const d of this.destinations) {
      // initialize
      this.weatherMap[d] = {};
      this.weather.getCurrentWeatherByCity(d).subscribe(
        (res) => {
          this.weatherMap[d].current = res;
        },
        (err) => {
          this.weatherMap[d].error = 'Could not load current weather';
        }
      );

      this.weather.getForecastByCity(d).subscribe(
        (res: any) => {
          // take next 3 forecast entries (3-hour steps)
          if (res && res.list) {
            this.weatherMap[d].forecast = res.list.slice(0, 3).map((it: any) => ({ dt_txt: it.dt_txt, main: it.main, weather: it.weather }));
          }
        },
        (err) => {
          this.weatherMap[d].error = 'Could not load forecast';
        }
      );
    }
  }
}
