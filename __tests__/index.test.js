import generateDifferences from '../src/generateDifferences.js';
import stylish from '../formatters/stylish.js';
// test('gendiff', () => {
//   expect(generateDifferences('__tests__/__fixtures__/file-for-test-1.json', '__tests__/__fixtures__/file-for-test-2.json'))
//     .toEqual(`{
//   + action: run
//   - autor: somebody
//   + autor: John
//   - follow: false
//   host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 70
//   + timeout: 100
//   + verbose: true
// }`);
// });

// test('gendiff', () => {
//   expect(generateDifferences('__tests__/__fixtures__/file-for-test-1-yaml.yaml', '__tests__/__fixtures__/file-for-test-2-yaml.yaml'))
//     .toEqual(`{
//   + action: run
//   - autor: somebody
//   + autor: John
//   - follow: false
//   host: hexlet.io
//   - proxy: 123.234.53.22
//   - timeout: 70
//   + timeout: 100
//   + verbose: true
// }`);
// });

test('gendiff', () => {
  expect(stylish(generateDifferences('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json'), ' ', 4))
    .toEqual(
`{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`);
});
