import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonList, IonButton, IonGrid, IonRow, IonCol, IonIcon } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonList, IonButton, IonGrid, IonRow, IonCol, IonIcon, FormsModule]
})
export class Tab2Page {
  travelDays = 1;
  hotelCost = 0; // per day expected hotel cost
  foodCost = 0; // per day expected food cost
  travelCost = 0; // total travel cost (flights, trains etc.)

  constructor() {}

  get estimatedBudget(): number {
    const days = Number(this.travelDays) || 0;
    const hotelPerDay = Number(this.hotelCost) || 0;
    const foodPerDay = Number(this.foodCost) || 0;
    const travel = Number(this.travelCost) || 0;
    return Math.round((days * (hotelPerDay + foodPerDay) + travel) * 100) / 100;
  }

  get hotelTotal(): number {
    const days = Number(this.travelDays) || 0;
    return Math.round(days * (Number(this.hotelCost) || 0) * 100) / 100;
  }

  get foodTotal(): number {
    const days = Number(this.travelDays) || 0;
    return Math.round(days * (Number(this.foodCost) || 0) * 100) / 100;
  }

  formatCurrency(value: number): string {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
    } catch (e) {
      return `₹ ${value}`;
    }
  }

  get estimatedBudgetFormatted(): string {
    return this.formatCurrency(this.estimatedBudget);
  }

  get hotelTotalFormatted(): string {
    return this.formatCurrency(this.hotelTotal);
  }

  get foodTotalFormatted(): string {
    return this.formatCurrency(this.foodTotal);
  }

  get travelCostNumber(): number {
    return Math.round((Number(this.travelCost) || 0) * 100) / 100;
  }

  reset() {
    this.travelDays = 1;
    this.hotelCost = 0;
    this.foodCost = 0;
    this.travelCost = 0;
  }
}
