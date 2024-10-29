#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("gendiff") // Nombre de tu CLI
  .description("Compares two configuration files and shows a difference")
  .version("1.0.0"); // Definición de la versión de tu CLI

// Opción de ayuda ya es manejada automáticamente por commander

program.parse(process.argv);

// Opciones seleccionadas
const options = program.opts();

// Si deseas mostrar la ayuda si se solicita
if (options.help) {
  program.outputHelp(); // Muestra la ayuda si se solicita
}

// Si deseas manejar la opción de versión, esto ya está manejado por commander
if (options.version) {
  console.log("1.0.0"); // Muestra la versión si se solicita
}

// Si no hay ninguna opción especificada, podrías mostrar un mensaje o simplemente no hacer nada
if (!process.argv.slice(2).length) {
  program.outputHelp(); // Muestra la ayuda por defecto si no hay argumentos
}
