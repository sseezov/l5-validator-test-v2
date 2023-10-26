export default class StringSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(string) {
    return this.validators.every((validator) => validator(string));
  }

  startsFromUpperCase() {
    const forbiddenValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '?', ' '];
    const validator = (value) => (value.length > 0 ? value[0].toUpperCase() === value[0]
      && !forbiddenValues.includes(value[0]) : false);
    return new StringSchema([...this.validators, validator]);
  }

  length(num) {
    const validator = (value) => value.length === num;
    return new StringSchema([...this.validators, validator]);
  }

  hasExclamation() {
    const validator = (value) => value.includes('!');
    return new StringSchema([...this.validators, validator]);
  }
}
