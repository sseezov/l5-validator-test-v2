export default class StringValidator{
    constructor(validators){
        //
        this.validators =validators
    }
    startsFromUpperCase(){
        return new StringValidator([...this.validators, (val) => val.length > 0 && val[0].match(/[a-z]/i) && val[0] == val[0].toUpperCase()]);
    }
    length(lng){
        return new StringValidator([...this.validators, (val) => val.length == lng]);
    }
    hasExclamation(){
        return new StringValidator([...this.validators, (val) => val.includes('!')]);
    }

    isValid(val){
        return this.validators.every((validator) => validator(val));
    }
}