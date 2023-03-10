import _ from 'lodash';

const normalizeQuotes = (value) => (typeof (value) === 'string' ? `'${value}'` : `${value}`);

const plain = (value) => {
  const iter = (node, currentObj) => {
    let result = '';
    const keys = Object.keys(node);
    keys.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        currentObj.pop();
      }
      const keyWithMinus = `-${key.slice(1)}`;
      const keyWithPlus = `+${key.slice(1)}`;
      const keyWithoutSigns = `${key.slice(2)}`;
      if ((typeof (node[key])) === 'object' && (node[key] !== null) && (key[0] !== '+') && (key[0] !== '-')) {
        currentObj.push(key);
        result += iter(node[key], currentObj);
        currentObj.pop();
      } else {
        // апдейты
        // апдейт для элемента, который не объект
        if (Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && !_.isObject(node[key])
         && (key === keyWithMinus)
         && !_.isObject(node[keyWithPlus])) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From ${normalizeQuotes(node[keyWithMinus])} to ${normalizeQuotes(node[keyWithPlus])}\n`;
        }
        // апдейт для элемента, который стал объектом
        if (Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && _.isObject(node[keyWithPlus])
         && (key === keyWithMinus)) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From ${normalizeQuotes(node[keyWithMinus])} to [complex value]'\n`;
        }
        // апдейт для элемента, который был объектом
        if (Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && _.isObject(node[keyWithMinus])
         && (key === keyWithMinus)) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was updated. From [complex value] to ${normalizeQuotes(node[keyWithPlus])}\n`;
        }

        // удаление элемента вложенного и элемента верхнего уровня
        if (Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && !Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && (!Object.prototype.hasOwnProperty.call(value, key))) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was removed\n`;
        }
        if (Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && !Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && (Object.prototype.hasOwnProperty.call(value, key))) {
          result += `Property '${keyWithoutSigns}' was removed\n`;
        }
        // добавление элемента
        if (!Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && !_.isObject(node[key])) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was added with value: ${normalizeQuotes(node[key])}\n`;
        }
        if (!Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && _.isObject(node[key]) && (!Object.prototype.hasOwnProperty.call(value, key))) {
          result += `Property '${currentObj.join('.')}.${keyWithoutSigns}' was added with value: [complex value]\n`;
        }
        if (!Object.prototype.hasOwnProperty.call(node, keyWithMinus)
         && Object.prototype.hasOwnProperty.call(node, keyWithPlus)
         && _.isObject(node[key]) && (Object.prototype.hasOwnProperty.call(value, key))) {
          result += `Property '${keyWithoutSigns}' was added with value: [complex value]\n`;
        }
      }
    });

    return result;
  };
  return iter(value, []).trim();
};

export default plain;
