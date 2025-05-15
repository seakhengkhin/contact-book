export interface IContact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    get fullName(): string;
    get profileImage(): string;
}
export class Contact implements IContact {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';
  image: string = '';
  createdAt: string = '';
  updatedAt: string = '';
  createdBy: string = '';
  updatedBy: string = '';
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  get profileImage(): string {
    return import.meta.env.VITE_IMAGE_URL + `${ this.image === '' ? '/uploads/default.png' : this.image }`;
  }
  constructor(init?: IContact) {
    Object.assign(this, init);
  }
}