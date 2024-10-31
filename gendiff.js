#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";

const program = new Command();

program
  .name("gendiff")
  .arguments("<filepath1> <filepath2>")
  .description("Compares two configuration files and shows a difference")
  .version("1.0.0")
  .option("-f, --format [type]", "output format")
  .action((filepath1, filepath2) => {
    try {
      const data1 = readFile(filepath1);
      const data2 = readFile(filepath2);

      console.log("File 1 data:", data1);
      console.log("File 2 data:", data2);
    } catch (error) {
      console.error(`Error reading files: ${error.message}`);
    }
  });

// Обработка опций
program.parse(process.argv);

// Если не переданы аргументы, показываем помощь
if (!process.argv.slice(2).length) {
  program.outputHelp(); // Показывает помощь по умолчанию
}

// Функция для чтения файла
function readFile(filepath) {
  const absolutePath = path.resolve(process.cwd(), filepath);
  const content = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(content);
}
