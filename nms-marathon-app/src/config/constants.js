import {formatAppDate} from './utils';
export const adminList = [{mobile:8682890117, auth:"SUPER_ADMIN_ACCESS"},{mobile:9994374553, auth:"ADMIN_ACCESS"},{mobile:9944419808, auth:"ADMIN_ACCESS"}]
export const DB = {
    players : "developPlayer"
}

export const AUTH_STATUS = {
    "PENDING": "PENDING",
    "NOT_REGISTERED":"NOT_REGISTERED",
    "REGISTERED":"REGISTERED",
    "ADMIN_ACCESS":"ADMIN_ACCESS",
    "SUPER_ADMIN_ACCESS":"SUPER_ADMIN_ACCESS"
} 


export const EVENTS = {
    U_10_B:[{
        eventName: "4KM",
        eventId:"U_10_B_4KM",
        selection: false,
        disable:false
    }
    ],
    U_10_G:[{
        eventName: "4KM",
        eventId:"U_10_G_4KM",
        selection: false,
        disable:false
    }],
    U_14_B:[{
        eventName: "7KM",
        eventId:"U_14_B_7KM",
        selection: false,
        disable:false
    }],
    U_19_G:[{
        eventName: "7KM",
        eventId:"U_19_G_7KM",
        selection: false,
        disable:false
    }],
    U_19_B:[{
        eventName: "7KM",
        eventId:"U_19_B_7KM",
        selection: false,
        disable:false
    }]
}

export const U_14_EVENTS = ["100M, 200M, 600M", "SHORT_PUT", "LONG_JUMP", "DISCUSS_THROW"]
export const U_17_EVENTS = ["100M, 400M, 1500M", "SHORT_PUT", "LONG_JUMP", "DISCUSS_THROW", "JAWLIN_THROW"]
export const U_19_EVENTS = ["100M, 200M, 1500M", "SHORT_PUT", "LONG_JUMP"]

export const U_6_TIME = 1514764800000;  //01/01/2018  
export const U_8_TIME = 1451606400000;  //01/01/20016  
export const U_12_TIME = 1325376000000;  //01/01/2012  
export const U_17_TIME = 1167696000000;  //01/01/2007  


//For Marathon 2024
export const U_10_TIME = 1388534400000;  //01/01/2014  
export const U_14_TIME = 1262304000000;  //01/01/2010  
export const U_19_TIME = 1104537600000;  //01/01/2005  


export const playerCategories = ["U_12", "U_14", "U_17", "U_19"]

export const U_12 = "U_12";
export const U_14 = "U_14";
export const U_17 = "U_17";
export const U_19 = "U_19";
export const PAYMENT_STATUS = ["PAYMENT_VERIFIED", "PAYMENT_NOT_VERIFIED", "NOT_PAID", "NMS"]
export const PLAYER_STATUS = ["ACTIVE", "IN_ACTIVE"]
export const tShirtSizeList= ["28","30","32","34","36","38","40","42"]
export const initPlayerData = {
    name:"",
    adharNumber:"111111111111",
    clubName: "",
    dob:"",
    playerCategory:"",
    events:[],
    gender:"MALE",
    upi:"",
    mobile:"",
    selectedEvents: [],
    paymentStatus: PAYMENT_STATUS[1],
    status: PLAYER_STATUS[0],
    updatedByList: [],
    chestNumber: "",
    tShirtSize:tShirtSizeList[0]
}

export const initError = {
    name:{touched:false,err: false},
    adharNumber: {touched:true,err: false},
    dob:{touched:false,err: false},
    upi:{touched:false,err: false}
    // mobile:{touched:false,err: false},
}

