exports.checkEmailFormat = email => {
  if (!email) return false;
  const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return format.test(String(email).toLowerCase());
};

exports.formatMobileNumber = mobile => {
  mobile = mobile.toString();
  if (/(^\d{9,11}$)/.test(mobile)) {
    if (/(^((947|07|7)([01245678])[0-9]{7})$)/.test(mobile)) {
      console.log('mobile2', mobile);
      return '94' + mobile.substr(mobile.length - 9);
    } else {
      console.log('mobile3', mobile);
      return false;
    }
  } else {
    console.log('mobile4', mobile);
    return false;
  }
};
