export default class ArraySchema {
  constructor(validators) {
    this.validators = [...validators];
  }

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
        return Math.max(...result);
      };
      return iter(values) <= max;
    };

    return new ArraySchema([...this.validators, validator]);
  }
}
