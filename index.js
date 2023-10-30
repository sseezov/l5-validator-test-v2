import Validator from './src/Validator.js';
const v = new Validator();
function getArrayDepth(obj) {
    if (Array.isArray(obj)) return 1 + Math.max(...obj.map(t => getArrayDepth(t)))
    else return 0
}

console.log(getArrayDepth([[1], [[2]], [[[3]]]]))
export default Validator;
