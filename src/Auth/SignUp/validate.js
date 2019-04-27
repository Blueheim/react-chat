import printf from 'printf';

const ERRORS = {
  ERROR_REQUIRED: 'is required',
  ERROR_ONLY_LETTERS: 'must only have letters',
  ERROR_ONLY_NUMBERS: 'must only have numbers',
  ERROR_EMAIL: 'must be a valid email address',
  ERROR_MIN_LENGTH: 'length must be at least %d characters long',
  ERROR_FIELD_EQUALITY: 'must be equal to',
  ERROR_MEDIUM_PASSWORD: 'must be stronger',
  ERROR_STRONG_PASSWORD: 'must be stronger',
};

let validationSchema = null;
let formToValid = null;

const setData = (formSchema, formData) => {
  validationSchema = formSchema;
  formToValid = formData;
};

const validate = (formSchema, formData) => {
  setData(formSchema, formData);

  let isValid = true;

  const validationResult = validateData();
  for (let fieldResult of Object.values(validationResult)) {
    if (fieldResult.errors.length) {
      isValid = false;
    }
  }

  return { isValid, validationResult };
};

const validateData = () => {
  const validationResult = {};

  for (let key of Object.keys(validationSchema)) {
    validationResult[key] = {};
    if (formToValid[key] === 'undefined') {
      throw new Error('Field missing in form data');
    }
    const fieldErrors = validateField(validationSchema[key], formToValid[key]);
    validationResult[key].errors = fieldErrors;
  }

  return validationResult;
};

const validateField = (fieldSchema, value) => {
  const fieldErrors = [];
  fieldSchema.rules.forEach(rule => {
    const error = processRule(rule, value, fieldSchema.label);

    if (typeof error === 'object') {
      if (error.length > 0) {
        fieldErrors.push(...error);
      }
    } else {
      fieldErrors.push(error);
    }
  });
  return fieldErrors.filter(Boolean);
};

const processRule = (rule, value, label = '') => {
  let reg;

  let typeOfRule = typeof rule;

  if (typeOfRule === 'string') {
    switch (rule) {
      case 'REQUIRED':
        return Boolean(value.trim()) ? '' : `${label} ${ERRORS['ERROR_REQUIRED']}`;
      case 'EMAIL':
        reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(value) ? '' : `${label} ${ERRORS['ERROR_EMAIL']}`;
      case 'ONLY_LETTERS':
        reg = /^[A-Za-z]+$/;
        return reg.test(value) ? '' : `${label} ${ERRORS['ERROR_ONLY_LETTERS']}`;
      case 'ONLY_NUMBERS':
        reg = /^[0-9]+$/;
        return reg.test(value) ? '' : `${label} ${ERRORS['ERROR_ONLY_NUMBERS']}`;
      case 'MEDIUM_PASSWORD':
        reg = new RegExp('^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
        return reg.test(value) ? '' : `${label} ${ERRORS['ERROR_MEDIUM_PASSWORD']}`;
      case 'STRONG_PASSWORD':
        reg = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
        return reg.test(value) ? '' : `${label} ${ERRORS['ERROR_STRONG_PASSWORD']}`;
      default:
        throw Error('Unknown validation rule');
    }
  }

  if (typeOfRule === 'object') {
    const entries = Object.entries(rule);

    const errors = entries.map(entry => {
      switch (entry[0]) {
        case 'MIN_LENGTH':
          return value.length >= entry[1] ? '' : `${label} ${printf(ERRORS['ERROR_MIN_LENGTH'], entry[1])}`;
        case 'FIELD_EQUALITY':
          return value === formToValid[entry[1]]
            ? ''
            : `${label} ${ERRORS['ERROR_FIELD_EQUALITY']} ${validationSchema[entry[1]].label}`;
        default:
          throw Error('Unknown validation rule');
      }
    });

    // Remove falsy values
    return errors.filter(Boolean);
  }
};

export default validate;
