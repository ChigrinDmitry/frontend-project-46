import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';
import generateDifferences from '../src/generateDifferences.js';

const diff = (filepath1, filepath2, formatName) => {
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

export default diff;
