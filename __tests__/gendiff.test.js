import genDiff from '../gendiff.js';

test('gendiff should compare two JSON objects and produce the correct output', () => {
  const data1 = { a: 1, b: 2, c: 3 };
  const data2 = { a: 1, b: 3, d: 4 };

  const expectedOutput = `{
    - b: 2
    + b: 3
      a: 1
    + d: 4
    - c: 3
  }`;

  const result = genDiff(data1, data2);

  // Normalizar la cadena: eliminar saltos de línea adicionales y ordenar las líneas
  const normalizeString = (str) => str
    .split('\n') // Divide en líneas
    .map((line) => line.trim()) // Elimina los espacios adicionales de cada línea
    .filter((line) => line !== '') // Elimina las líneas vacías
    .sort() // Ordena las líneas
    .join('\n'); // Vuelve a unir las líneas con saltos de línea

  expect(normalizeString(result)).toEqual(normalizeString(expectedOutput));
});
