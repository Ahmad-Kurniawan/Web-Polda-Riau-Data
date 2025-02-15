export interface Company {
  id: number;
  name: string;
  area: number;
  target2Percent?: number;
  target7Percent?: number;
  monokulturTargets?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  monokulturAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  tumpangSariTargets?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  tumpangSariAchievements: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  csrAchievements?: {
    I: number;
    II: number;
    III: number;
    IV: number;
  };
  progress?: Progress[];
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
  otherCompanies: Company[];

}

export interface Progress {
  id: number;
  namaPJ: string;
  nomorTelp: string;
  area: number;
  coordinates: number;
  photo: number;
  monokultur: {
    targetTanam: {
      luas: number;
      persentase: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase: number;
    };
    belumTanam: {
      luas: number;
      persentase: number;
    };
    panen: {
      luas: number;
      persentase: number;
    };
    keterangan: string;
  };
  tumpangSari: {
    targetTanam: {
      luas: number;
      persentase: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase: number;
    };
    belumTanam: {
      luas: number;
      persentase: number;
    };
    panen: {
      luas: number;
      persentase: number;
    };
    keterangan: string;
  };
  csr: {
    targetTanam: {
      luas: number;
      persentase: number;
    };
    waktuTanam: string;
    progresTanam: {
      luas: number;
      persentase: number;
    };
    belumTanam: {
      luas: number;
      persentase: number;
    };
    panen: {
      luas: number;
      persentase: number;
    };
    keterangan: string;
  };
}


