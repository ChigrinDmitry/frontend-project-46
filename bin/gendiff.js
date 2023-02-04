#!/usr/bin/env node

import { Command } from 'commander';
import generateDifferencesJSON from '../src/generateDifferences.js';
import generateDifferencesYAML from '../src/generateDifferencesYML.js';
import getExtension from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>');

program
  .option('-f, --format <type>', 'output format');

program
  .action((filepath1, filepath2) => {
    if ((getExtension(filepath1) === 'json') && (getExtension(filepath2) === 'json')) {
      console.log(generateDifferencesJSON(filepath1, filepath2));
    }
    if ((getExtension(filepath1) === 'yaml') && (getExtension(filepath2) === 'yaml')) {
      console.log(generateDifferencesYAML(filepath1, filepath2));
    }
  });

program.parse(process.argv);
