const pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
      }
      return obj;
    }, {});
};

const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next).then(msg => res.send(msg)).catch((err) => next(err)));
};

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

const safeJsonParser = (str) => {
  try {
      let p = JSON.parse(str);
      return p;
  } catch (error) {
      return null;
  }
};

module.exports = {
    pick,catchAsync,sleep,safeJsonParser
}