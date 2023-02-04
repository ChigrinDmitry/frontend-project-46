import _ from 'lodash';

export const getExtension = (fileName) => fileName.split('.').at(-1);

export const compareObjects = (obj1, obj2) => {
  const resultObj = {};
  const keysOfObj1 = Object.keys(obj1);
  const keysOfObj2 = Object.keys(obj2);
  const allKeys = _.uniq(keysOfObj1.concat(keysOfObj2).sort());

  allKeys.forEach((key) => {
    if (keysOfObj1.includes(key) && keysOfObj2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        resultObj[key] = obj1[key];
      } else {
        resultObj[`- ${key}`] = obj1[key];
        resultObj[`+ ${key}`] = obj2[key];
      }
    }
    if (!keysOfObj1.includes(key)) {
      resultObj[`+ ${key}`] = obj2[key];
    }
    if (!keysOfObj2.includes(key)) {
      resultObj[`- ${key}`] = obj1[key];
    }
  });
  return resultObj;
};
