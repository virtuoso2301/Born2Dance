const isEmailValid = Email => {
  const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  return regEx.test(Email) && Email.length > 0;
};
const isMobileNumberValid = MobileNumber => {
  const regEx = /^([0|\+[0-9]{1,5})?([5-9][0-9]{9})$/;
  return regEx.test(MobileNumber) && MobileNumber.length > 9;
};
const isPasswordValid = Password => {
  return Password.length > 7;
};
const isSamePasswords = (Password, ConfirmPassword) => {
  return Password === ConfirmPassword;
};
const isPINValid = PIN => {
  return PIN.length === 4;
};
const isSamePIN = (PIN, ConfirmPIN) => {
  return PIN.length === 4 && ConfirmPIN.length === 4 && PIN === ConfirmPIN;
};
export default {
  isEmailValid,
  isMobileNumberValid,
  isPasswordValid,
  isSamePasswords,
  isPINValid,
  isSamePIN,
};
