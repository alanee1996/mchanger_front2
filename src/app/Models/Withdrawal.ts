import { User } from './user';

export class Withdrawal {
  public amount: number;
  public walletId: number;
  public date: Date;
  public purpose: string;
}


export class WithdrawProcess {
  public amount: number;
  public walletId: number;
  public currency: string;
  public date: Date;
  public purpose: string;
  public user: User = new User();
}
