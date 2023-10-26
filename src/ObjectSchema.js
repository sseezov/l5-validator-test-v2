export default class ObjectSchema {
  constructor(obj) {
    this.obj = obj;
  }

  // eslint-disable-next-line class-methods-use-this
  shape(obj) {
    return new ObjectSchema(obj);
  }

  isValid(value) {
    const keys = Object.keys(value);
    if (keys.length !== Object.keys(this.obj).length) {
      return false;
    }
    return keys.every((item) => this.obj[item].isValid(value[item]));
  }
}
