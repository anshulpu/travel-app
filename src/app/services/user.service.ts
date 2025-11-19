import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor() {}

  getUsers(): User[] {
    return [
      { id: 1, name: 'Gagan' },
      { id: 2, name: 'Asha' },
      { id: 3, name: 'Ravi' },
    ];
  }
}
