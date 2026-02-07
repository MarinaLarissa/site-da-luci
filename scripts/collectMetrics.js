#!/usr/bin/env node

/**
 * Collect build and test metrics for logging
 * Usage: node scripts/collectMetrics.js [--output json|table]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Change to frontend directory (where package.json is)
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
const BUILD_DIR = path.join(FRONTEND_DIR, 'build');

const OUTPUT_FORMAT = process.argv.includes('--output')
  ? process.argv[process.argv.indexOf('--output') + 1]
  : 'json';

/**
 * Execute command and return output
 */
function exec(command, options = {}) {
  try {
    return execSync(command, {
      encoding: 'utf8',
      cwd: FRONTEND_DIR,
      stdio: ['pipe', 'pipe', 'pipe'],
      ...options,
    }).trim();
  } catch (error) {
    return null;
  }
}

/**
 * Get bundle size from build directory
 */
function getBundleSize() {
  try {
    if (!fs.existsSync(BUILD_DIR)) {
      return null;
    }

    const jsFiles = fs
      .readdirSync(path.join(BUILD_DIR, 'static', 'js'))
      .filter((f) => f.endsWith('.js') && !f.endsWith('.map'));

    const totalSize = jsFiles.reduce((sum, file) => {
      const filePath = path.join(BUILD_DIR, 'static', 'js', file);
      const stats = fs.statSync(filePath);
      return sum + stats.size;
    }, 0);

    return Math.round(totalSize / 1024); // KB
  } catch (error) {
    return null;
  }
}

/**
 * Get test results
 */
function getTestResults() {
  try {
    // Run tests in CI mode (non-interactive)
    const output = exec('npm test -- --ci --json --coverage --testLocationInResults', {
      stdio: ['pipe', 'pipe', 'ignore'], // Suppress stderr
      env: { ...process.env, CI: 'true' },
    });

    if (!output) return null;

    const results = JSON.parse(output);
    return {
      passing: results.numPassedTests || 0,
      failing: results.numFailedTests || 0,
      total: results.numTotalTests || 0,
      coverage: results.coverageMap
        ? {
            statements: results.coverageMap.data?.statements?.pct ?? null,
            branches: results.coverageMap.data?.branches?.pct ?? null,
            functions: results.coverageMap.data?.functions?.pct ?? null,
            lines: results.coverageMap.data?.lines?.pct ?? null,
          }
        : null,
    };
  } catch (error) {
    // Fallback: parse test output
    try {
      const output = exec('npm test -- --ci --passWithNoTests', {
        env: { ...process.env, CI: 'true' },
      });

      if (!output) return null;

      const passMatch = output.match(/(\d+) passed/);
      const failMatch = output.match(/(\d+) failed/);
      const totalMatch = output.match(/(\d+) total/);

      return {
        passing: passMatch ? parseInt(passMatch[1], 10) : 0,
        failing: failMatch ? parseInt(failMatch[1], 10) : 0,
        total: totalMatch ? parseInt(totalMatch[1], 10) : 0,
        coverage: null,
      };
    } catch (fallbackError) {
      return null;
    }
  }
}

/**
 * Get build time (approximate via production build)
 */
function getBuildTime() {
  try {
    const start = Date.now();
    exec('npm run build', { stdio: 'ignore' });
    const duration = Date.now() - start;
    return duration; // milliseconds
  } catch (error) {
    return null;
  }
}

/**
 * Get git diff stats
 */
function getGitStats() {
  try {
    const diff = exec('git diff --stat HEAD');
    if (!diff) return null;

    const match = diff.match(/(\d+) files? changed(?:, (\d+) insertions?\(\+\))?(?:, (\d+) deletions?\(-\))?/);
    if (!match) return null;

    return {
      files_changed: parseInt(match[1], 10),
      insertions: match[2] ? parseInt(match[2], 10) : 0,
      deletions: match[3] ? parseInt(match[3], 10) : 0,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Collect all metrics
 */
async function collectMetrics() {
  const metrics = {
    timestamp: new Date().toISOString(),
    bundle_size_kb: getBundleSize(),
    test_results: getTestResults(),
    git_stats: getGitStats(),
  };

  // Optional: Build time (SLOW - ~10-30s)
  // Uncomment if you want build time metrics
  // metrics.build_time_ms = getBuildTime();

  return metrics;
}

/**
 * Format metrics as table
 */
function formatAsTable(metrics) {
  const lines = [];
  lines.push('## Metrics');
  lines.push('');
  lines.push('| Metric | Value |');
  lines.push('|--------|-------|');
  lines.push(`| Timestamp | ${metrics.timestamp} |`);

  if (metrics.bundle_size_kb !== null) {
    lines.push(`| Bundle Size | ${metrics.bundle_size_kb} KB |`);
  }

  if (metrics.test_results) {
    const { passing, failing, total } = metrics.test_results;
    lines.push(`| Tests | ${passing}/${total} passing (${failing} failing) |`);

    if (metrics.test_results.coverage) {
      const { statements, branches, functions, lines } = metrics.test_results.coverage;
      if (statements !== null) lines.push(`| Coverage (Statements) | ${statements.toFixed(1)}% |`);
      if (branches !== null) lines.push(`| Coverage (Branches) | ${branches.toFixed(1)}% |`);
      if (functions !== null) lines.push(`| Coverage (Functions) | ${functions.toFixed(1)}% |`);
      if (lines !== null) lines.push(`| Coverage (Lines) | ${lines.toFixed(1)}% |`);
    }
  }

  if (metrics.git_stats) {
    const { files_changed, insertions, deletions } = metrics.git_stats;
    lines.push(`| Files Changed | ${files_changed} |`);
    lines.push(`| Insertions | +${insertions} |`);
    lines.push(`| Deletions | -${deletions} |`);
  }

  if (metrics.build_time_ms !== null && metrics.build_time_ms !== undefined) {
    lines.push(`| Build Time | ${(metrics.build_time_ms / 1000).toFixed(1)}s |`);
  }

  return lines.join('\n');
}

/**
 * Main
 */
(async () => {
  console.error('Collecting metrics...');
  const metrics = await collectMetrics();

  if (OUTPUT_FORMAT === 'table') {
    console.log(formatAsTable(metrics));
  } else {
    console.log(JSON.stringify(metrics, null, 2));
  }
})();
