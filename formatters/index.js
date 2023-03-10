import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import generateDifferences from '../src/generateDifferences.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  let result;
  if (formatName === 'plain') {
    result = plain(generateDifferences(filepath1, filepath2));
  }
  if (formatName === 'stylish') {
    result = stylish(generateDifferences(filepath1, filepath2), ' ', 4);
  }
  if (formatName === 'json') {
    result = json(generateDifferences(filepath1, filepath2));
  }
  return result;
};

export default genDiff;

console.log(generateDifferences('/Users/dmitrychigrin/Desktop/test-data-1/__fixtures__/file1.yml', '/Users/dmitrychigrin/Desktop/test-data-1/__fixtures__/file2.yml'));