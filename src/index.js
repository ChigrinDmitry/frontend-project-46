// здесь собираю функции, которые универсальные

const getExtension = (fileName) => fileName.split('.').at(-1);
export default getExtension;
