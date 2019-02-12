export class User {
  username: string;
  email: string;
  fname: string;
  lname: string;
  country: string;
  profile_img: string;
  rolename: string;
  businessNature: string;
  career: string;
  ic: string;
  passportNo: string;
  phone: string;
  reference: {
    value: string;
  };
}


export class UserDetail {
  userId: number;
  username: string;
  email: string;
  verify: boolean;
  roleId: number;
  active: boolean;
  createdDate: Date;
  modifiedDate: Date;
  type: string;
  fname: string;
  lname: string;
  phone: string;
  profile_img: string;
  countryId: number;
  career: string;
  businessNature: string;
  ic: string;
  passportNo: string;
  address: Address = new Address();
}

export class Address {
  id: number;
  location: string;
  postcode: string;
  state: State;
}

  export class State {
    id: number;
    name: string;
  }


export class UserType {
  type: string;
  value: string;
}
