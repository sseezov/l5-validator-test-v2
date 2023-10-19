import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';
import StringSchema from './StringSchema.js';

export default class Validator {
  string() {
    return new StringSchema();
  }

  array() {
    return new ArraySchema();
  }

  object() {
    return new ObjectSchema();
  }
}
