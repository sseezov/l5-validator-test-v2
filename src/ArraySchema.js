export default class ArrayValidator {
    constructor() {
        this.validators = [(val) => Array.isArray(val)]
    }
    maxDepth(lng) {
        let validator = (val) => {
            return Array.isArray(val) ?
                1 + Math.max(0, ...val.map(validator)) :
                0;
        };
        this.validators.push((val) => lng >= validator(val) - 1);
        return this;
    }

    isValid(val) {
        return this.validators.every((validator) => validator(val));
    }
}