import ArraySchema from './ArraySchema.js';
import StringSchema from './StringSchema.js';

export default class Validator {
  string() {
    return new StringSchema();
  }
  array() {
    return new ArraySchema();
  }
}
