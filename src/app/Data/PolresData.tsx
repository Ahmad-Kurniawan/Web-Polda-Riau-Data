import { PolresData } from '../types';
import { inhuCompanies } from './Perusahaan-Target-polda/inhu';
import { rohilCompanies } from './Perusahaan-Target-polda/rohil';
import { KamparCompanies } from './Perusahaan-Target-polda/Kampar';
import { PelalawanCompanies } from './Perusahaan-Target-polda/Pelalawan';
import { PKUCompanies } from './Perusahaan-Target-polda/PKU';
import { siakCompanies } from './Perusahaan-Target-polda/siak';
import { kuansingCompanies } from './Perusahaan-Target-polda/Kuansing';
import { bengkaliscompanies } from  './Perusahaan-Target-polda/bengkalis'
import { inhilcompanies } from './Perusahaan-Target-polda/inhil';
import { rohulCompanies } from './Perusahaan-Target-polda/Rohul';
import { pelalawanOther } from './Perusahaan-society-poktan/pelalawan-other';
import { kuansingOther } from './Perusahaan-society-poktan/kuansing-other';
import { inhuOther } from './Perusahaan-society-poktan/inhu-other';
import { kamparOther } from './Perusahaan-society-poktan/kampar-other';
import { inhilOther } from './Perusahaan-society-poktan/inhil-other';
import { bengkalisOther } from './Perusahaan-society-poktan/bengkalis-other';
import { rohilOther } from './Perusahaan-society-poktan/rohil-other';
import { rohulOther } from './Perusahaan-society-poktan/rohul-other';
import { merantiOther } from './Perusahaan-society-poktan/meranti-other';
import { dumaiOther } from './Perusahaan-society-poktan/dumai-other';

export const datapolres: PolresData[] = [
    {
        id: 1,
        nama: "INDRAGIRI HULU",
        coordinates: [-0.5062587626567405, 102.22070185428481],
        totalArea: 156157.69,
        monokulturTarget: 3123.15,
        tumpangSariTarget: 10931.04,
        totalTarget: 14054.19,
        companies: inhuCompanies,
        otherCompanies: inhuOther
    },
    {
        id: 2,
        nama: "KAMPAR",
        coordinates: [0.4068, 101.2181],
        totalArea: 142487.29,
        monokulturTarget: 2849.75,
        tumpangSariTarget: 9974.11,
        totalTarget: 12823.86,
        companies: KamparCompanies,
        otherCompanies: kamparOther
    },
    {
        id: 3,
        nama: "INDRAGIRI HILIR",
        coordinates: [-0.3432, 103.0304],
        totalArea: 360823.78,
        monokulturTarget: 7216.48,
        tumpangSariTarget: 25257.66,
        totalTarget: 32474.14,
        companies: inhilcompanies,
        otherCompanies: inhilOther
    },
    {
        id: 4,
        nama: "PEKANBARU",
        coordinates: [0.5333, 101.45],
        totalArea: 132368.11,
        monokulturTarget: 2647.36,
        tumpangSariTarget: 9265.77,
        totalTarget: 11913.13,
        companies: PKUCompanies,
        otherCompanies: []
    },
    {
        id: 5,
        nama: "BENGKALIS",
        coordinates: [1.4804, 102.1335],
        totalArea: 74903.62,
        monokulturTarget: 1498.07,
        tumpangSariTarget: 5243.25,
        totalTarget: 6741.33,
        companies: bengkaliscompanies,
        otherCompanies: bengkalisOther
    },
    {
        id: 6,
        nama: "PELALAWAN",
        coordinates: [0.1952, 102.1654],
        totalArea: 173114.47,
        monokulturTarget: 3462.29,
        tumpangSariTarget: 12118.01,
        totalTarget: 15580.30,
        companies: PelalawanCompanies,
        otherCompanies: pelalawanOther
    },
    {
        id: 7,
        nama: "ROKAN HILIR",
        coordinates: [1.8648793362231944, 100.69519367611285],
        totalArea: 83209.98,
        monokulturTarget: 1664.20,
        tumpangSariTarget: 5824.70,
        totalTarget: 7488.90,
        companies: rohilCompanies,
        otherCompanies: rohilOther
    },
    {
        id: 8,
        nama: "SIAK",
        coordinates: [0.8691723690456171, 101.81940175928257],
        totalArea: 102105.66,
        monokulturTarget: 2042.11,
        tumpangSariTarget: 7147.40,
        totalTarget: 9189.51,
        companies: siakCompanies,
        otherCompanies: []
    },
    {
        id: 9,
        nama: "KUANTAN SINGINGI",
        coordinates: [-0.524020536122323, 101.50946758486292],
        totalArea: 74304.86,
        monokulturTarget: 1486.10,
        tumpangSariTarget: 5201.34,
        totalTarget: 6687.44,
        companies: kuansingCompanies,
        otherCompanies: kuansingOther
    },
    {
        id: 10,
        nama: "ROKAN HULU",
        coordinates: [1.0717023015292773, 100.49848745055259],
        totalArea: 166485.98,
        monokulturTarget: 3329.72,
        tumpangSariTarget: 11654.02,
        totalTarget: 14983.74,
        companies: rohulCompanies,
        otherCompanies: rohulOther
    },
    {
        id: 11,
        nama: "KEPULAUAN MERANTI",
        coordinates: [0.8850, 102.6500],
        totalArea: 0,
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        totalTarget: 3245.00,
        companies: [],
        otherCompanies: merantiOther
    },
    {
        id: 12,
        nama: "DUMAI",
        coordinates: [1.6627197743147384, 101.39805017115371],
        totalArea: 0,
        monokulturTarget: 0,
        tumpangSariTarget: 0,
        totalTarget: 287.50,
        companies: [],
        otherCompanies: dumaiOther
    }
];
