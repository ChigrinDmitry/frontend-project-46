export const normalizeQuotes = (value) => {
  return typeof(value) === 'string' ? `'${value}'` : `${value}`;
};
