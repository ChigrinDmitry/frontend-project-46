import generateDifferencesJSON from '../src/generateDifferences.js';

test('gendiff', () => {
  expect(generateDifferencesJSON('__tests__/__fixtures__/file-for-test-1.json', '__tests__/__fixtures__/file-for-test-2.json'))
    .toEqual(`{
  + action: run
  - autor: somebody
  + autor: John
  - follow: false
  host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 70
  + timeout: 100
  + verbose: true
}`);
});
