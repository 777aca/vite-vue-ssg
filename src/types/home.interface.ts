export interface HomeAppBarOptions {
  name: string;
  path: string;
}

export interface HomeCarouselInterface {
  id: number;
  description: string;
  url: string;
  type: number;
  zone: number;
  link: string;
}

export interface HomeFirearmsGroupInterface {
  typeName: string;
  children: HomeFirearmsInterface[];
}

export interface HomeFirearmsInterface {
  name: string;
  key2: string;
  firepower: number;
  stability: number;
  range: number;
  Mobility: number;
}

export interface HomeRuleInterface {
  name: string;
  nickname: string;
  voiceActor: string;
  heroDescription: string;
  skill: {
    skillName: string;
    skillDetils: string;
    [string: string]: unknown;
  }[];
  [string: string]: unknown;
}

export interface HomeNewsInterface {
  id: number;
  title: string;
  content: string;
  type: number;
  broadcast_image: string;
  status: number;
  start_time: number;
  end_time: number;
  zone: number;
  rank: number;
  created_at: number;
}
