// здесь описываю первую задачку

import { log } from 'console';
import * as fs from 'fs';
import _ from 'lodash';
import { getExtension } from '../src/index.js'
import path from 'path';
import { cwd } from 'node:process';

const compareObjects = (obj1, obj2) => {
  const resultObj = {};
  const keysOfObj1 = Object.keys(obj1).sort();
  const keysOfObj2 = Object.keys(obj2).sort();
  const allKeys = _.uniq(keysOfObj1.concat(keysOfObj2).sort());

  for (const key of allKeys) {
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
  };
  return resultObj;
};

export const generateDifferencesJSON = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));
  
  const obj1 = JSON.parse(fileContent1);
  const obj2 = JSON.parse(fileContent2);

  const resultOfComparingObjects = compareObjects(obj1, obj2);

  return JSON.stringify(resultOfComparingObjects, null, 2).replace(/["\,]/g, '');
};
