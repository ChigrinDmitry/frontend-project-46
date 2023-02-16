import * as fs from 'fs';
import path from 'path';
import { compareObjects } from './index.js';
import parse from './parsers.js';

const generateDifferences = (filepath1, filepath2) => {
  const fileContent1 = fs.readFileSync(path.resolve(process.cwd(), filepath1));
  const fileContent2 = fs.readFileSync(path.resolve(process.cwd(), filepath2));

  const obj1 = parse(filepath1, fileContent1);
  const obj2 = parse(filepath2, fileContent2);
  return compareObjects(obj1, obj2);
};

export default generateDifferences;
