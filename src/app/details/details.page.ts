import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: 'details.page.html',
  styleUrls: ['details.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    NgIf,
  ],
})
export class DetailsPage {
  name = '';
  id: number | null = null;

  constructor() {
    // read from history.state when navigated with state
    const s = (history && (history.state as any)) || {};
    if (s && s.data) {
      this.name = s.data.name || '';
      this.id = s.data.id ?? null;
    }
  }

  goBack() {
    // simple history back; router could be used if preferred
    history.back();
  }
}
