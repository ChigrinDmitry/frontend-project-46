#!/usr/bin/env node

import { Command } from 'commander';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import generateDifferences from '../src/generateDifferences.js';
import { diff } from '../formatters/index.js';

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
    console.log(diff(filepath1, filepath2, options.format))
  });

program.parse(process.argv);
