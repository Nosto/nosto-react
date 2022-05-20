export default function stringinate(obj) {
  Object.keys(obj).forEach(function (property) {
    if (obj[property] instanceof URL) {
      obj[property] = obj[property].toString();
    }
    if (typeof obj[property] === "object") {
      stringinate(obj[property]);
    }
    obj[property] = obj[property];
  });
  return obj;
}
