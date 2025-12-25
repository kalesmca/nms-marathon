import { formatAppDate } from './utils';
export const adminList = [
  { mobile: 8682890117, auth: 'SUPER_ADMIN_ACCESS' },
  { mobile: 9994374553, auth: 'ADMIN_ACCESS' },
  { mobile: 9944419808, auth: 'ADMIN_ACCESS' },
];
export const DB = {
  players: 'testPlayer',
};

export const AUTH_STATUS = {
  PENDING: 'PENDING',
  NOT_REGISTERED: 'NOT_REGISTERED',
  REGISTERED: 'REGISTERED',
  ADMIN_ACCESS: 'ADMIN_ACCESS',
  SUPER_ADMIN_ACCESS: 'SUPER_ADMIN_ACCESS',
};

export const EVENTS = {
  U_10_B: [
    {
      eventName: '3KM',
      eventId: 'U_10_B_3KM',
      selection: false,
      disable: false,
    },
  ],
  U_10_G: [
    {
      eventName: '3KM',
      eventId: 'U_10_G_3KM',
      selection: false,
      disable: false,
    },
  ],
  U_14_B: [
    {
      eventName: '7KM',
      eventId: 'U_14_B_7KM',
      selection: false,
      disable: false,
    },
  ],
  U_14_G: [
    {
      eventName: '7KM',
      eventId: 'U_14_G_7KM',
      selection: false,
      disable: false,
    },
  ],
  U_19_B: [
    {
      eventName: '8KM',
      eventId: 'U_19_B_8KM',
      selection: false,
      disable: false,
    },
  ],
  OPEN_B: [
    {
      eventName: '7KM',
      eventId: 'OPEN_CATEGORY_BOYS',
      selection: false,
      disable: false,
    },
  ],
  OPEN_G: [
    {
      eventName: '7KM',
      eventId: 'OPEN_CATEGORY_GIRLS',
      selection: false,
      disable: false,
    },
  ],
};

export const U_14_BOYS_MAP_URL =
  'https://www.google.com/maps/dir/9.389588,+77.484815/9.389338,+77.485896/Seithur,+Tamil+Nadu/9.389630,+77.484710/@9.3970486,77.4790389,14.52z/data=!4m35!4m34!1m3!2m2!1d77.484815!2d9.389588!1m13!2m2!1d77.485896!2d9.389338!3m4!1m2!1d77.4880689!2d9.3891571!3s0x3b06ebeb6714e7a7:0x63f74ac2ec0eee71!3m4!1m2!1d77.4891347!2d9.3906259!3s0x3b06ebeba0c52f0f:0x7364c576df5a0d44!1m10!1m1!1s0x3b06ebfb52792fd9:0x800d352085962dd4!2m2!1d77.4800491!2d9.4049781!3m4!1m2!1d77.4742615!2d9.3968651!3s0x3b06ebf7104af847:0xa1648bcfe0bd9411!1m3!2m2!1d77.48471!2d9.38963!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';
export const U_14_GIRLS_MAP_URL =
  'https://www.google.com/maps/dir/9.389595,+77.484770/9.389175,+77.488092/9.390330,+77.489105/AMMAIAPPAR+POLYTECHNIC+COLLEGE,+Tamil+Nadu/@9.3772848,77.4914778,15z/data=!4m20!4m19!1m3!2m2!1d77.48477!2d9.389595!1m3!2m2!1d77.488092!2d9.389175!1m3!2m2!1d77.489105!2d9.39033!1m5!1m1!1s0x3b06eb01ee208143:0x91a2e4e6e35547fd!2m2!1d77.5153551!2d9.3618589!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';
export const U_19_MAP_URL =
  'https://www.google.com/maps/dir/9.389595,+77.484770/9.389175,+77.488092/9.390330,+77.489105/AMMAIAPPAR+POLYTECHNIC+COLLEGE,+Tamil+Nadu/@9.3772848,77.4914778,15z/data=!4m20!4m19!1m3!2m2!1d77.48477!2d9.389595!1m3!2m2!1d77.488092!2d9.389175!1m3!2m2!1d77.489105!2d9.39033!1m5!1m1!1s0x3b06eb01ee208143:0x91a2e4e6e35547fd!2m2!1d77.5153551!2d9.3618589!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';
export const U_10_MAP_URL =
  'https://www.google.com/maps/dir/9.389590,+77.484789/9.392626,+77.470973/9.389529,+77.484899/@9.3917004,77.4732856,15.65z/data=!4m14!4m13!1m3!2m2!1d77.484789!2d9.38959!1m3!2m2!1d77.470973!2d9.392626!1m3!2m2!1d77.484899!2d9.389529!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';
export const OPEN_MAP_URL =
  'https://www.google.com/maps/dir/South+Street+Hindu+Nadar+Higher+Secondary+School,+Dist,+Muhavoor,+Tamil+Nadu+626111/9.389195,+77.488128/9.390523,+77.489125/Anand+Sweets+and+Supermarket,+Dhalavaipuram,+thalavaipram,+Tamil+Nadu/Krishnapuram,+Virudhunagar,+Tamil+Nadu/9.392659,+77.470887/SSHN+Hr+Sec+School,+Dist,+Muhavoor,+Tamil+Nadu/@9.4032252,77.4755598,13.92z/data=!4m38!4m37!1m5!1m1!1s0x3b06ebed0ba8f6ed:0x5fb9290c18697113!2m2!1d77.4834359!2d9.390081!1m3!2m2!1d77.488128!2d9.389195!1m3!2m2!1d77.489125!2d9.390523!1m5!1m1!1s0x3b06ebc1b9cffa85:0x6a302030b21a1fe5!2m2!1d77.4947801!2d9.3913595!1m5!1m1!1s0x3b06e9706c7e2cfd:0xe09ddcdb1b353b23!2m2!1d77.5076941!2d9.4211002!1m3!2m2!1d77.470887!2d9.392659!1m5!1m1!1s0x3b06ebed0ba8f6ed:0x5fb9290c18697113!2m2!1d77.4834359!2d9.390081!3e0?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D';

export const U_14_EVENTS = ['100M, 200M, 600M', 'SHORT_PUT', 'LONG_JUMP', 'DISCUSS_THROW'];
export const U_17_EVENTS = [
  '100M, 400M, 1500M',
  'SHORT_PUT',
  'LONG_JUMP',
  'DISCUSS_THROW',
  'JAWLIN_THROW',
];
export const U_19_EVENTS = ['100M, 200M, 1500M', 'SHORT_PUT', 'LONG_JUMP'];

export const U_6_TIME = 1514764800000; //01/01/2018
export const U_8_TIME = 1451606400000; //01/01/20016
export const U_12_TIME = 1325376000000; //01/01/2012
export const U_17_TIME = 1167696000000; //01/01/2007

//For Marathon 2025
export const U_10_TIME = 1451586600000; //01/01/2016
export const U_14_TIME = 1325356200000; //01/01/2012
export const U_19_TIME = 1167589800000; //01/01/2007

export const playerCategories = ['U_12', 'U_14', 'U_17', 'U_19'];

export const U_12 = 'U_12';
export const U_14 = 'U_14';
export const U_17 = 'U_17';
export const U_19 = 'U_19';
export const PAYMENT_STATUS = ['PAYMENT_VERIFIED', 'PAYMENT_NOT_VERIFIED', 'NOT_PAID', 'NMS'];
export const PLAYER_STATUS = ['ACTIVE', 'IN_ACTIVE'];
export const tShirtSizeList = ['Please Select','28', '30', '32', '34', '36', '38', '40', '42'];
export const initPlayerData = {
  name: '',
  adharNumber: '111111111111',
  clubName: '',
  dob: '',
  playerCategory: '',
  events: [],
  gender: 'MALE',
  upi: '',
  mobile: '',
  selectedEvents: [],
  paymentStatus: PAYMENT_STATUS[1],
  status: PLAYER_STATUS[0],
  updatedByList: [],
  chestNumber: '',
  tShirtSize: tShirtSizeList[0],
};

export const initError = {
  name: { touched: false, err: false },
  adharNumber: { touched: true, err: false },
  dob: { touched: false, err: false },
  upi: { touched: false, err: false },
  tShirtSize:{ touched: false, err: false }
  // mobile:{touched:false,err: false},
};
