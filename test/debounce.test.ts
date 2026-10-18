import { debounce } from '../src/debounce';
import { test } from 'node:test';
import assert from 'node:assert';

test('debounce delays execution', async () => {
  let called = 0;
  const fn = debounce(() => { called++; }, 50);
  fn();
  fn();
  assert.strictEqual(called, 0);
  await new Promise((r) => setTimeout(r, 80));
  assert.strictEqual(called, 1);
});
