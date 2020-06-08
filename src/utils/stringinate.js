"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringinate(obj) {
    Object.keys(obj).forEach(property => {
        if (obj[property] instanceof URL) {
            obj[property] = obj[property].toString();
        }
        if (typeof obj[property] === 'object') {
            return stringinate(obj[property]);
        }
        obj[property] = obj[property];
    });
    return obj;
}
exports.default = stringinate;
//# sourceMappingURL=stringinate.js.map