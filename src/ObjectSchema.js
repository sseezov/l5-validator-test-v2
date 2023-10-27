export default class ObjectValidator {
    constructor(){
        this.validators = [(val) => typeof val == "object"];
    }
    shape(shapeObject){
        let keys = Object.keys(shapeObject);
        this.validators.push((val) =>
            keys.every(p => shapeObject[p].isValid(val[p]))
        
        );
        return this;
    }
    isValid(val) {
        return this.validators.every((validator) => validator(val));
    }
}