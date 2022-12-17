import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export const MEMBER_TITLE = "Members List"


export const TASK_TYPES = {
    dropDownLabel:"Type",
    name:"type",
    optionList:[
    {
        label:'BUY',
        id:1
    },
    {
        label:'SELL',
        id:2
    },
    
]};

export const LEFT_MENU_LIST = {
    dropDownLabel:"Type",
    name:"type",
    optionList:[
    {
        label:'Registration',
        id:1,
        component: InboxIcon
    },
    {
        label:'Show-all',
        id:2,
        component: MailIcon
    },
    
]};

export const TRANSACTION_TYPES = [
    {
        label:'DEPOSIT',
        id:"TRANS_1"
    },
    {
        label:'WITHDRAW',
        id:"TRANS_2"
    },
    
];