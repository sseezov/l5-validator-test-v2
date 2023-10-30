import StringValidator from "./StringSchema.js";
import ArrayValidator from "./ArraySchema.js";
import ObjectValidator from './ObjectSchema.js'

export default class Validator{
    array(){
        return new ArrayValidator([(val) => Array.isArray(val)]);
    }
    object(){
        return new ObjectValidator([(val) => typeof val == "object"]);
    }
    string(){
        return new StringValidator([(val) => typeof val == "string"]);
    }
}
