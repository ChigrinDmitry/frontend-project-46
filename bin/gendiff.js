#!/usr/bin/env node

import { Command } from 'commander';
import _ from 'lodash';
import { generateDifferencesJSON } from '../src/generateDifferences.js';

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
    console.log(generateDifferencesJSON(filepath1, filepath2));
  });

program.parse(process.argv);