import yaml from 'js-yaml';
import { getExtension } from './index.js';

const parse = (filepath, fileContent) => {
  if ((getExtension(filepath) === 'json') && (getExtension(filepath) === 'json')) {
    return JSON.parse(fileContent);
  } return yaml.load(fileContent);
};

export default parse;
