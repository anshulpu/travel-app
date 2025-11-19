import { Component, Input } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile-modal',
  templateUrl: 'profile-modal.component.html',
  styleUrls: ['profile-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export class ProfileModalComponent {
  @Input() message = '';

  constructor(private modalCtrl: ModalController) {}

  close() {
    this.modalCtrl.dismiss();
  }
}
