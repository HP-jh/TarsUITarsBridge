import { withRetry } from '../src/retry';
import { test } from 'node:test';
import assert from 'node:assert';

test('withRetry succeeds on first try', async () => {
  const result = await withRetry(async () => 'ok');
  assert.strictEqual(result, 'ok');
});

test('withRetry retries and succeeds', async () => {
  let attempts = 0;
  const result = await withRetry(async () => {
    attempts++;
    if (attempts < 2) throw new Error('fail');
    return 'ok';
  }, 3, 10);
  assert.strictEqual(result, 'ok');
  assert.strictEqual(attempts, 2);
});
