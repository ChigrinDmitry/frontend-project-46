import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import generateDifferences from '../src/generateDifferences.js';

export const normalizeQuotes = (value) => {
  return typeof(value) === 'string' ? `'${value}'` : `${value}`;
};

export const diff = (filepath1, filepath2, formatName) => {
  if (formatName === 'plain') {
    return plain(generateDifferences(filepath1, filepath2))
  }
  if (formatName === 'stylish') {
    return stylish(generateDifferences(filepath1, filepath2), ' ', 4);
  }
};
