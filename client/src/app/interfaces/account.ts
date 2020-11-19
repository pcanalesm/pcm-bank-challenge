import { Transaction } from './transaction';
import { User } from './user';

export interface AccountUser {
    _id: string;
    amount: number;
    transactions: Transaction[];
    user: User;
}
