import * as fs from 'fs';
import path from 'path';
import { getExtension, compareObjects } from './index.js';
import yamlParser from './parsers.js';

const generateDifferences = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

  if ((getExtension(filepath1) === 'json') && (getExtension(filepath2) === 'json')) {
    const obj1 = JSON.parse(fileContent1);
    const obj2 = JSON.parse(fileContent2);
    const resultOfComparingObjects = compareObjects(obj1, obj2);
    return JSON.stringify(resultOfComparingObjects, null, 2).replace(/[",]/g, '');
  }

  if (((getExtension(filepath1) === 'yaml') || (getExtension(filepath1) === 'yml'))
  && ((getExtension(filepath2) === 'yaml') || (getExtension(filepath2) === 'yml'))) {
    const obj1 = yamlParser(fileContent1);
    const obj2 = yamlParser(fileContent2);
    const resultOfComparingObjects = compareObjects(obj1, obj2);
    return JSON.stringify(resultOfComparingObjects, null, 2).replace(/[",]/g, '');
  }

  return 'not .JSON or . YML';
};

export default generateDifferences;
