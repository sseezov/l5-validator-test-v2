import _ from 'lodash';

export default class ArraySchema {
  validators = [(value) => Array.isArray(value)];

  isValid(array) {
    return this.validators.every((validator) => validator(array));
  }

  maxDepth(max) {
    const validator = (values) => {
      const iter = (element, depth = -1) => {
        if (!Array.isArray(element)) {
          return depth;
        }
        const result = element.map((value) => iter(value, depth + 1));
        return _.flattenDeep(result);
      };
      return iter(values).every((val) => val <= max);
    };

    this.validators.push(validator);
    return this;
  }
}
