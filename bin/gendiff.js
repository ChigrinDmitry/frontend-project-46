#!/usr/bin/env node

import { Command } from 'commander';
import stylish from '../formatters/stylish.js';
import generateDifferences from '../src/generateDifferences.js';

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
    const options = program.opts();
    if (options.format === undefined) {
      console.log(stylish(generateDifferences(filepath1, filepath2), ' ', 4));
    }
  });

program.parse(process.argv);
