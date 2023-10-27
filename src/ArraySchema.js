export default class ArrayValidator {
    constructor(validators) {
        //
        this.validators = validators
    }
    maxDepth(lng) {
        let validator = (val) => {
            return Array.isArray(val) ?
                1 + Math.max(0, ...val.map(validator)) :
                0;
        };
        return new ArrayValidator([...this.validators, (val) => lng >= validator(val) - 1]);
    }

    isValid(val) {
        return this.validators.every((validator) => validator(val));
    }
}