import _ from 'lodash';

export default class ArraySchema {
  validators = [(value) => Array.isArray(value)];

  isValid(array) {
    return this.validators.every((validator) => validator(array));
  }

  maxDepth(max) {
    const validator = (values, depth = -1) => {
      if (!Array.isArray(values)) {
        return depth;
      }

      const result = values.map((value) => validator(value, depth + 1));
      return _.flattenDeep(result);
    };

    const v = (value) => validator(value).every((val) => val <= max);
    this.validators.push(v);
    return this;
  }
}
