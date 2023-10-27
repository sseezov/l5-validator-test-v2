export default class ObjectValidator {
    constructor(validators){
        this.validators = validators;
    }
    shape(shapeObject){
        let keys = Object.keys(shapeObject);
        return new ObjectValidator([...this.validators, (val) =>
            keys.every(p => shapeObject[p].isValid(val[p]))
        
        ]);
    }
    isValid(val) {
        return this.validators.every((validator) => validator(val));
    }
}