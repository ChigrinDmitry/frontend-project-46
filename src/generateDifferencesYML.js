import * as fs from 'fs';
import _ from 'lodash';
import path from 'path';
import yamlParser from './parsers.js';
import getExtension from './index.js';

const compareObjects = (obj1, obj2) => {
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

const generateDifferencesYAML = (filepath1, filepath2) => {
  if ((getExtension(filepath1) === 'yaml') && (getExtension(filepath2) === 'yaml')) {
    const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
    const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

    const obj1 = yamlParser(fileContent1);
    const obj2 = yamlParser(fileContent2);

    const resultOfComparingObjects = compareObjects(obj1, obj2);

    return JSON.stringify(resultOfComparingObjects, null, 2).replace(/[",]/g, '');
  }
  return 'not .YAML';
};

export default generateDifferencesYAML;
