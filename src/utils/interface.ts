export interface IAccountsData {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: string;
}

export interface IProfilesData {
  profileId: number;
  country: string;
  marketplace: string;
}

export interface ICampaignsData {
  campaignId: number;
  clicks: number;
  cost: number;
  date: string;
}

export interface IMainData {
  accounts: IAccountsData[];
  profiles: IProfilesData[];
  campaigns: ICampaignsData[];
}
