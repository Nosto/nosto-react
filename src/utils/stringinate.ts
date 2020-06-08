export default function stringinate(obj: {
  [key: string]: any;
}): { [key: string]: any } {
  Object.keys(obj).forEach((property) => {
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
