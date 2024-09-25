export interface Session {
  address: string;
  email: string;
  secondEmail: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: number;
  roleId: number;
  role: string;
  userCode: string;
  userName: string;
  typeLogin: null;
  business: Business | null;
  country: Country | null;
  token: string;
  workerId: number;
  firstLogin?: boolean;
}

export interface Business {
  businessId: number;
  address: string;
  code: string;
  createdBy: string;
  name: string;
  manager: string;
  managerContact: string;
  usersCount: number;
  countryId: number;
  logoId: number;
  themeId: number;
  country: Country;
}

export interface Country {
  countryId: number;
  name: string;
  code: string;
}
