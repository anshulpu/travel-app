import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { NgIf, NgForOf } from '@angular/common';

@Component({
  selector: 'app-saved',
  templateUrl: 'saved.page.html',
  styleUrls: ['saved.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon, NgIf, NgForOf],
})
export class SavedPage {
  favorites: Array<{ name: string; img?: string; categories?: string[] }> = [];

  constructor() {
    this.loadFavorites();
  }

  loadFavorites() {
    try {
      const raw = localStorage.getItem('favorites_full') || localStorage.getItem('favorites');
      if (!raw) return;
      const parsed = JSON.parse(raw);
      // If parsed is names array, convert to objects with name only
      if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'string') {
        this.favorites = parsed.map((n: string) => ({ name: n }));
      } else if (Array.isArray(parsed)) {
        this.favorites = parsed;
      }
    } catch (e) {
      console.warn('Could not load saved favorites', e);
    }
  }

  removeFavorite(name: string) {
    this.favorites = this.favorites.filter((f) => f.name !== name);
    try {
      localStorage.setItem('favorites_full', JSON.stringify(this.favorites));
      localStorage.setItem('favorites', JSON.stringify(this.favorites.map((f) => f.name)));
    } catch (e) {
      console.warn('Could not update storage', e);
    }
  }
}
