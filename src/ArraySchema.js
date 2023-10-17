export default class ArraySchema {
  validators = [(value) => Array.isArray(value)];

  isValid(array) {
    return this.validators.every((validator) => validator(array));
  }
}