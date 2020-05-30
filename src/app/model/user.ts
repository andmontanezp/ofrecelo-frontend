import { Role } from './role';
import { EmailValidator } from '@angular/forms';

export class User {
    id: number;
    username: string;
    email: string
    password: string;
    name: string;
    lastName: string;
    role: Role;
    phone: String;
    access_token?: string;
}