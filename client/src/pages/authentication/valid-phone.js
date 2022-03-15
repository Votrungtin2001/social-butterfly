function validate(phone) {
  var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  if (regex.test(phone)) {
      return true;
  } else {
    return false;
  }
} 

function checkPhoneLength(phone) {
  return phone.length == 10;
}

export function checkValidPhone(phone) {
  if (!phone)
      return false;
  return checkPhoneLength(phone);
}