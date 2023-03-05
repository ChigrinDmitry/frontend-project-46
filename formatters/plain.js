// что делаем?
// навреное, буду прописывать через ифы
// если + и - , то ремувд -, аддед +
// если + , то было дообавлелние свойства
// если -, то удаление
// если пробел - то не выводим

// используем hasOwnProperty
// const object1 = {};
// object1.property1 = 42;

// console.log(object1.hasOwnProperty('property1'));
// // Expected output: true

import _ from 'lodash';
import generateDifferences from '../src/generateDifferences.js';
import { normalizeQuotes } from './index.js';

const plain = (value) => {
  const iter = (node, currentObj) => {
    // console.log('currentObj', currentObj)
    let result = '';
    const keys = Object.keys(node);
    // console.log('===== keys', keys)
    // console.log('keys', keys)
    keys.forEach((key) => {
      if (value.hasOwnProperty(key)) {
        currentObj = [];
      }
      // console.log('----- currentObj', currentObj)
      // console.log('key', key)
      const keyWithMinus = `-${key.slice(1)}`;
      const keyWithPlus = `+${key.slice(1)}`;
      const keyWithoutSigns = `${key.slice(2)}`;
      // console.log('keyWithMinus', keyWithMinus)
      // console.log('keyWithPlus', keyWithPlus)
      // console.log('keyWithoutSigns', keyWithoutSigns)
      if ((typeof (node[key])) === 'object' && (node[key] !== null) && (key[0] !== '+') && (key[0] !== '-')) {
        currentObj.push(key);
        result += iter(node[key], currentObj);
        currentObj.pop();
      } else {
        // апдейты
        // апдейт для элемента, который не объект
        if (node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && !_.isObject(node[key]) && (key === keyWithMinus)) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From ${normalizeQuotes(node[keyWithMinus])} to ${normalizeQuotes(node[keyWithPlus])}\n`;
        }
        // апдейт для элемента, который стал объектом
        if (node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && _.isObject(node[keyWithPlus])) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From ${normalizeQuotes(node[keyWithMinus])} to [complex value]'\n`;
        }
        // апдейт для элемента, который был объектом
        if (node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && _.isObject(node[keyWithMinus]) && (key === keyWithMinus)) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From [complex value] to ${normalizeQuotes(node[keyWithPlus])}\n`;
        }

        // удаление элемента вложенного и элемента верхнего уровня
        if (node.hasOwnProperty(keyWithMinus) && !node.hasOwnProperty(keyWithPlus) && (!value.hasOwnProperty(key))) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was removed\n`;
        }
        if (node.hasOwnProperty(keyWithMinus) && !node.hasOwnProperty(keyWithPlus) && (value.hasOwnProperty(key))) {
          result += `Property '${keyWithoutSigns}' was removed\n`;
        }
        // добавление элемента
        if (!node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && !_.isObject(node[key])) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was added with value: ${normalizeQuotes(node[key])}\n`;
        }
        if (!node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && _.isObject(node[key]) && (!value.hasOwnProperty(key))) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was added with value: [complex value]\n`;
        }
        if (!node.hasOwnProperty(keyWithMinus) && node.hasOwnProperty(keyWithPlus) && _.isObject(node[key]) && (value.hasOwnProperty(key))) {
          result += `Property '${keyWithoutSigns}' was added with value: [complex value]\n`;
        }
      }
    });

    return result;
  };
  return iter(value, []).trim();
};

export default plain;

// console.log(
//   plain(generateDifferences('__tests__/__fixtures__/file1.json',
//   '__tests__/__fixtures__/file2.json'))
// );

// let testofidea = plain(generateDifferences('__tests__/__fixtures__/file1.json',
// '__tests__/__fixtures__/file2.json'));
// let qwerty = testofidea.split(' ');
// qwerty.map((key => {
//   if (key === 'true' || key === 'false' || key === 'null') {
//     key.slice(1, -1);
//   }
//   return key
// }));

// console.log('"true"'.slice(1, -1))
