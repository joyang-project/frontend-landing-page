export interface ConstructionCase {
  id: number;
  title: string;
  category: '가정용' | '업소용';
  img: string;
  desc: string;
}

export interface StrengthItem {
  title: string;
  desc: string;
  icon: any;
}