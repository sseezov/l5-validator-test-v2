export default class StringValidator{
    constructor(){
        this.validators = [(val) => typeof val == "string"]
    }
    startsFromUpperCase(){
        this.validators.push((val) => val.length > 0 && val[0].match(/[a-z]/i) && val[0] == val[0].toUpperCase())
        return this;
    }
    length(lng){
        this.validators.push((val) => val.length == lng)
        return this;
    }
    hasExclamation(){
        this.validators.push((val) => val.includes('!'))
        return this;
    }
    isValid(val){
        return this.validators.every((validator) => validator(val));
    }
}