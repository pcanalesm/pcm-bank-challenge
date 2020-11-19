import { User } from './user';

export interface Transaction {
    _id: string;
    type: string;
    amount: number;
    remaining_amount: number;
    destiny_user: User;
    origin_user: User;
}
