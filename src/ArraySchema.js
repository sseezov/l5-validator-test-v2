export default class ArraySchema {

    constructor(validators = []) {
        const defaultValid = [(value) => Array.isArray(value)];
        this.validators = [...defaultValid, ...validators];
    }

    isValid(value) {
        return this.validators.every((validator) => validator(value) === true);
    }


    maxDepth(num) {
        const validate = (value) => {
            let result = 0;
                const inner = (val, depth = -1) => {
                    if (!Array.isArray(val)) {
                        result > depth ? result : result = depth;
                        return result;
                    } 
                        return val.map((item) => {
                            return inner(item, depth + 1)
                        })
                }
                inner(value);
                return Math.max(result) <= num;
            }
        this.validators = [...this.validators, ...[validate]];
        return new ArraySchema(this.validators);
        }        
}