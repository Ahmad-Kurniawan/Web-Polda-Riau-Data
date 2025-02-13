export interface Company {
    id: number;
    name: string;
    area: number;
    target2Percent: number;
    target7Percent: number;
    quarterlyTargets: {
        Q1: number;
        Q2: number;
        Q3: number;
        Q4: number;
    };
    achievement: {
        Q1: number;
        Q2: number;
        Q3: number;
        Q4: number;
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
  