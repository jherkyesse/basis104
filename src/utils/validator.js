// default, numeric, number, alphabet, uppercase, lowercase, opeNo, custom

function validateNumeric(value = '') {
  return (/\d+/g).test(value);
}

// Validate (+/-)(Digit)
function validateNumber(value = '') {
  return (/^(-){0,1}\d+$/g).test(value);
}

function validateAlphabet(value = '') {
  return (/^[a-z|A-Z]*$/g).test(value);
}

function validateUppercase(value = '') {
  return (/^[|A-Z]*$/g).test(value);
}

function validateLowercase(value = '') {
  return (/^[a-z]*$/g).test(value);
}

function validateOpeNo(value = '') {
  return (/^[0-9]{0,4}((\.){0,1})[0-9]{0,3}$/g).test(value);
}

function validateCustom(value = '', regular) {
  return regular.test(value);
}

const validationMethodMap = {
  default: () => {},
  numeric: validateNumeric,
  number: validateNumber,
  alphabet: validateAlphabet,
  uppercase: validateUppercase,
  lowercase: validateLowercase,
  opeNo: validateOpeNo,
  custom: validateCustom,
};

const validationResultMap = {
  default: '',
  numeric: 'Invalid input. Please enter /\\d+/g',
  number: 'Invalid input. Please enter /^(-){0,1}\\d+$/g',
  alphabet: 'Invalid input. Please enter /^[a-z|A-Z]*$/g',
  uppercase: 'Invalid input. Please enter uppercase.',
  lowercase: 'Invalid input. Please enter lowercase',
  opeNo: 'Invalid input. Please enter XXXX.XXX',
  custom: 'Invalid input',
};

export function validate({ type, value, regular }) {
  const validation = validationMethodMap[type](value, regular);
  return validation ? '' : validationResultMap[type];
}

export function toNumeric() {

}
