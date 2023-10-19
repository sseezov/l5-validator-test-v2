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

const validator = new Validator();
const schema1 = validator.array().maxDepth(3);
console.log(schema1.isValid([0, 0, 0, 0, [1, [2]]]));
