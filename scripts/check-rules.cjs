#!/usr/bin/env node
/* Simple rules checker to enforce project standards */
const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const projectRoot = process.cwd();

function fail(message) {
  console.error(`RULES CHECK FAILED: ${message}`);
  process.exitCode = 1;
}

function checkFunctionsDeployScript() {
  const pkgPath = join(projectRoot, 'functions', 'package.json');
  if (!existsSync(pkgPath)) return;
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
  const scripts = (pkg && pkg.scripts) || {};
  if (scripts.deploy && /firebase\s+deploy\s+--only\s+functions/.test(scripts.deploy)) {
    fail('Disallowed deploy script in functions/package.json. Remove it.');
  }
}

function main() {
  checkFunctionsDeployScript();
  // Add more checks as needed
}

main();
