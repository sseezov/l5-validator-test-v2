export default class StringSchema {

    constructor(validators = []) {
        const defaultValid = [(value) => typeof(value) === 'string'];
        this.validators = [...defaultValid, ...validators];
    }

    isValid(value) {
        return this.validators.every((validator) => validator(value) === true);
    }

    startsFromUpperCase() {
        const validate = (value) => (/[A-Z]/).test(value[0]);
        this.validators = [...this.validators, ...[validate]];
        return new StringSchema(this.validators);
    }

    length(num) {
        const validate = (value) => value.length === num;
        this.validators = [...this.validators, ...[validate]];
        return new StringSchema(this.validators);
    }

    hasExclamation() {
        const validate = (value) => (/!/).test(value);
        this.validators = [...this.validators, ...[validate]];
        return new StringSchema(this.validators);
    }
};