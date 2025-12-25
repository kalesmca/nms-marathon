import { adminList } from './constants';

//  it's return YYYY-MM-DD
export const formatAppDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const checkIsAdmin = (data) => {
  let flag = false;

  adminList.map((admin) => {
    if (admin.mobile == data) {
      flag = true;
    }
  });
  return flag;
};

export const getSortedList = (objList, key, type) => {
  if (type == 'ASC') {
    objList.sort(function (a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  } else {
    objList.sort(function (a, b) {
      if (a[key] > b[key]) {
        return -1;
      }
      if (a[key] < b[key]) {
        return 1;
      }
      return 0;
    });
  }
  return objList;
};
