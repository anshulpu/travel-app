import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonImg,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  ToastController,
  ActionSheetController,
  AlertController,
  ModalController,
  IonInput,
} from '@ionic/angular/standalone';
import { NgIf, NgForOf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { PostService } from '../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonRefresher,
    IonRefresherContent,
    IonInput,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonImg,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class Tab1Page {
  searchQuery: string = '';
  isFavorite = false;
  items: Array<{ name: string; img: string; categories?: string[]; isFav?: boolean; anim?: boolean }> = [
    {
      name: 'Paris',
      img: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=8e6b38a0c6d4a9b7a9f2b8b6b0a6d5c2',
      categories: ['Historical', 'Popular'],
      isFav: false,
      anim: false,
    },
    {
      name: 'London',
      img: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=3f9c1b5ea6f0e5c3d8b9c6f1e2a5b7c8',
      categories: ['Historical'],
      isFav: false,
      anim: false,
    },
    {
      name: 'New York',
      img: 'https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a4f6b8c9d7e5f3a6b8c1d2e3f4a5b6c',
      categories: ['Popular'],
      isFav: false,
      anim: false,
    },
    {
      name: 'Tokyo',
      img: 'https://images.unsplash.com/photo-1505685296765-3a2736de412f?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7e9b2a3c4d5f6a8b9c0d1e2f3a4b5c6d',
      categories: ['Budget','Popular'],
      isFav: false,
      anim: false,
    },
    {
      name: 'Manali',
      img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcde',
      categories: ['Hill Station'],
      isFav: false,
      anim: false,
    },
    {
      name: 'Goa',
      img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=fghij',
      categories: ['Beaches', 'Popular'],
      isFav: false,
      anim: false,
    },
    {
      name: 'Agra',
      img: 'https://images.unsplash.com/photo-1541447275626-2b9f1b3d4f5b?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=klmno',
      categories: ['Historical','Budget'],
      isFav: false,
      anim: false,
    },
  ];
  categoriesList: string[] = ['Popular','Budget','Hill Station','Beaches','Historical'];
  selectedCategory: string = '';
  users: any[] = [];
  posts: any[] = [];
  submittedValues: any = null;

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private userService: UserService,
    private postService: PostService,
    private fb: FormBuilder
  ) {
    // load users from service
    this.users = this.userService.getUsers();

    // load favorite state from storage
    this.loadFavoritesFromStorage();

    // fetch posts (first 5)
    this.postService.getPosts().subscribe((res: any[]) => {
      this.posts = (res || []).slice(0, 5);
    });
  }

  get filteredItems() {
    const q = this.searchQuery?.trim().toLowerCase();
    let res = this.items;
    if (q) {
      res = res.filter((it) => it.name.toLowerCase().includes(q));
    }
    if (this.selectedCategory) {
      res = res.filter((it) => (it.categories || []).includes(this.selectedCategory));
    }
    return res;
  }

  selectCategory(cat: string) {
    if (this.selectedCategory === cat) {
      this.selectedCategory = '';
    } else {
      this.selectedCategory = cat;
    }
  }

  ionViewWillEnter() {
    console.log('Home page entered');
    // refresh favorites from storage in case they changed in Saved page
    this.loadFavoritesFromStorage();
  }

  goToAbout() {
    this.router.navigate(['/tabs/about']);
  }

  goToDetails() {
    this.router.navigate(['/tabs/details'], {
      state: { data: { id: 10, name: 'Ionic' } },
    });
  }

  goToDetailsItem(item?: { name: string; img?: string }) {
    const payload = item ? { id: null, name: item.name } : { id: 10, name: 'Ionic' };
    this.router.navigate(['/tabs/details'], { state: { data: payload } });
  }

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  toggleFavoriteItem(item: any, index: number, showToast = true) {
    item.isFav = !item.isFav;
    // animate briefly
    item.anim = true;
    setTimeout(() => (item.anim = false), 300);

    // persist favorites as full objects for Saved Destinations page
    const favObjects = this.items.filter((i) => i.isFav).map((i) => ({ name: i.name, img: i.img, categories: i.categories }));
    try {
      localStorage.setItem('favorites_full', JSON.stringify(favObjects));
      // keep legacy 'favorites' key for backward compatibility
      const favNames = favObjects.map((f) => f.name);
      localStorage.setItem('favorites', JSON.stringify(favNames));
    } catch (e) {
      console.warn('Could not persist favorites', e);
    }

    if (showToast) {
      const msg = item.isFav ? `${item.name} added to favorites` : `${item.name} removed from favorites`;
      this.toastCtrl.create({ message: msg, duration: 1200 }).then((t) => t.present());
    }
  }

  loadFavoritesFromStorage() {
    try {
      // Prefer full favorites (objects) saved under 'favorites_full'
      const rawFull = localStorage.getItem('favorites_full');
      if (rawFull) {
        const favObjs: any[] = JSON.parse(rawFull);
        const favNames = favObjs.map((f) => f.name);
        this.items.forEach((it) => (it.isFav = favNames.includes(it.name)));
        return;
      }
      // Fallback to legacy names-only key
      const raw = localStorage.getItem('favorites');
      if (raw) {
        const favNames: string[] = JSON.parse(raw);
        this.items.forEach((it) => (it.isFav = favNames.includes(it.name)));
      }
    } catch (e) {
      // ignore
    }
  }

  get favoritesCount() {
    return this.items.filter((i) => i.isFav).length;
  }

  deleteItem(i: number) {
    this.items.splice(i, 1);
  }

  async showToast() {
    const t = await this.toastCtrl.create({
      message: 'Saved Successfully!',
      duration: 2000,
    });
    await t.present();
  }

  async openActionSheet() {
    const sheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: [
        {
          text: 'Share',
          icon: 'share-social',
          handler: () => {
            console.log('Share clicked');
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: async () => {
            const alert = await this.alertCtrl.create({
              header: 'Confirm',
              message: 'Are you sure you want to delete?',
              buttons: [
                { text: 'Cancel', role: 'cancel' },
                {
                  text: 'Delete',
                  handler: () => {
                    console.log('Deleted');
                  },
                },
              ],
            });
            await alert.present();
          },
        },
        { text: 'Cancel', role: 'cancel', icon: 'close' },
      ],
    });
    await sheet.present();
  }

  saveToLocalStorage() {
    localStorage.setItem('name', 'Gagan');
  }

  async retrieveFromLocalStorage() {
    const name = localStorage.getItem('name');
    const alert = await this.alertCtrl.create({
      header: 'Stored Value',
      message: name || 'No value found',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async openProfileModal() {
    const { ProfileModalComponent } = await import('../profile-modal/profile-modal.component');
    const modal = await this.modalCtrl.create({
      component: ProfileModalComponent,
      componentProps: { message: 'Hello Modal' },
    });
    await modal.present();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submittedValues = this.form.value;
    }
  }

  doRefresh(event: any) {
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  }
}
