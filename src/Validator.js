/* eslint-disable class-methods-use-this */
import ArraySchema from './ArraySchema.js';
import ObjectSchema from './ObjectSchema.js';
import StringSchema from './StringSchema.js';

export default class Validator {
  string() {
    return new StringSchema([(value) => typeof value === 'string']);
  }

  array() {
    return new ArraySchema([(value) => Array.isArray(value)]);
  }

  object() {
    return new ObjectSchema();
  }
}
