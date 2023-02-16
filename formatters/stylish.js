const stylish = (value, replacer = ' ', replacerCounter = 1) => {
  const iter = (node, depth) => {
    let result = '';

    if ((typeof (node) !== 'object') || (node === null)) {
      result += `${node}`;
    }

    if ((typeof (node) === 'object') && (!Array.isArray(node)) && (node !== null)) {
      result = `{\n${result}`;
      const keys = Object.keys(node);

      keys.map((key) => {
        if ((key[0] === '-') || (key[0] === '+') || (key[0] === ' ')) {
          result = `${result}${replacer.repeat((replacerCounter * (depth + 1)) - 2)}${key}: ${iter(node[key], (depth + 1))}\n`;
        } else {
          result = `${result}${replacer.repeat(replacerCounter * (depth + 1))}${key}: ${iter(node[key], (depth + 1))}\n`;
        }
        return result;
      });

      result = `${result}${replacer.repeat(replacerCounter * depth)}}`;
    }
    return result;
  };
  return iter(value, 0);
};

export default stylish;
