import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { openWeatherConfig } from '../../../src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = openWeatherConfig.apiKey;
  private base = 'https://api.openweathermap.org/data/2.5';

  constructor(private http: HttpClient) {}

  hasKey(): boolean {
    return !!this.apiKey && this.apiKey.length > 5;
  }

  getCurrentWeatherByCity(city: string): Observable<any> {
    const url = `${this.base}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url).pipe(map((r) => r));
  }

  getForecastByCity(city: string): Observable<any> {
    const url = `${this.base}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${this.apiKey}`;
    return this.http.get(url).pipe(map((r) => r));
  }
}
