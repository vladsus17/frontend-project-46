#!/usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const program = new Command();

program
  .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format', 'plain')
  .action((filepath1, filepath2) => {
    try {
      const data1 = readFile(filepath1);
      const data2 = readFile(filepath2);
      const result = genDiff(data1, data2);

      // Imprimir el resultado
      console.log(result);
    } catch (error) {
      console.error(`Error reading files: ${error.message}`);
    }
  });

// Procesar opciones
program.parse(process.argv);

// Si no se pasan argumentos, muestra la ayuda
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// Función para leer el archivo
function readFile(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }
  try {
    const content = fs.readFileSync(absolutePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Invalid JSON format in file: ${absolutePath}`);
  }
}

// Función para calcular las diferencias
function genDiff(data1, data2) {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqKeys1 = _.difference(keys1, keys2);
  const uniqKeys2 = _.difference(keys2, keys1);
  const commonKeys = _.intersection(keys1, keys2);

  // Crear un array para almacenar los resultados
  const result = [];

  // Agregar claves únicas de data1 con "-"
  uniqKeys1.forEach((key) => {
    result.push(`- ${key}: ${data1[key]}`);
  });

  // Agregar claves comunes con valores diferentes
  commonKeys.forEach((key) => {
    if (data1[key] !== data2[key]) {
      result.push(`- ${key}: ${data1[key]}`);
      result.push(`+ ${key}: ${data2[key]}`);
    }
  });

  // Agregar claves comunes con valores iguales
  commonKeys.forEach((key) => {
    if (data1[key] === data2[key]) {
      result.push(`  ${key}: ${data1[key]}`);
    }
  });

  // Agregar claves únicas de data2 con "+"
  uniqKeys2.forEach((key) => {
    result.push(`+ ${key}: ${data2[key]}`);
  });

  // Ordenar el resultado alfabéticamente ignorando el primer carácter
  const sortedResult = result.sort((a, b) => {
    const keyA = a.slice(2); // Elimina el prefijo "+ " o "- "
    const keyB = b.slice(2); // Elimina el prefijo "+ " o "- "
    return keyA.localeCompare(keyB);
  });

  // Formatear la salida final
  return `{\n  ${sortedResult.join('\n  ')}\n}`;
}
