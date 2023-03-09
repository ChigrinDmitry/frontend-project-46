#!/usr/bin/env node

import { Command } from 'commander';
import diff from '../formatters/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    console.log(diff(filepath1, filepath2, program.opts().format));
  });

program.parse(process.argv);
