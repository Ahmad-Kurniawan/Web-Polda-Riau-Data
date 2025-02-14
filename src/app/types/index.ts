export interface Company {
  id: number;
  name: string;
  area: number;
  target2Percent: number;
  target7Percent: number;
  
  // Monokultur targets per quarter
  monokulturTargets: {
      I: number;
      II: number;
      III: number;
      IV: number;
  };
  
  // Monokultur achievements per quarter
  monokulturAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  
  // Tumpang sari targets per quarter
  tumpangSariTargets: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  
  // Tumpang sari achievements per quarter
  tumpangSariAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  
  status: number;
  csr: number;
}

export interface PolresData {
  id: number;
  nama: string;
  coordinates: [number, number]; // latitude, longitude
  totalArea: number;
  monokulturTarget: number;
  tumpangSariTarget: number;
  totalTarget: number;
  companies: Company[];
}