const fs = require('fs');
const genDiff = require('../gendiff.cjs');

test('gendiff should compare two JSON objects and produce the correct output', () => {
  const dataFilePath = '/home/vladsus/frontend-project-46/__fixtures__/data.json';
  const expectedOutputFilePath = '/home/vladsus/frontend-project-46/__fixtures__/expectedOutput.json';

  const dataFileContent = fs.readFileSync(dataFilePath, 'utf-8');
  const { data1, data2 } = JSON.parse(dataFileContent);

  const expectedOutputContent = fs.readFileSync(
    expectedOutputFilePath,
    'utf-8',
  );
  const { output: expectedOutput } = JSON.parse(expectedOutputContent);

  const result = genDiff(data1, data2);

  const normalizeString = (str) => str
    .split('\n') // Divide en líneas
    .map((line) => line.trim()) // Elimina los espacios adicionales de cada línea
    .filter((line) => line !== '') // Elimina las líneas vacías
    .sort() // Ordena las líneas
    .join('\n'); // Vuelve a unir las líneas con saltos de línea

  expect(normalizeString(result)).toEqual(normalizeString(expectedOutput));
});
