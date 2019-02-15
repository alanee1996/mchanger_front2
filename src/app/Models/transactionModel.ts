import { Offer } from './offer';

export class TransactionModel {
  id: string;
  fromUserName: string;
  toUserName: string;
  amount: number;
  tax_amount: number;
  total: number;
  fromCurrency: string;
  toCurrency: string;
  offer: Offer = new Offer();
  status: string;
  statusId: string;
  transactionType: string;
  transactionTypeId: string;
  createdDate: Date;
  modifiedDate: Date;
}

