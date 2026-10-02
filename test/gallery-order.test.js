import test from 'node:test';
import assert from 'node:assert/strict';
import { pairBeforeAfter } from '../public/js/lightbox.js';

const shot = (name) => ({ name, kind: 'screenshot', mime: 'image/png', url: `/u/${name}` });

test('screenshots go Trước then Sau for each size, in the size order they arrived', () => {
  const stored = ['Sau · 375px · /school.html', 'Sau · 1280px · /school.html', 'Trước · 375px · /school.html', 'Trước · 1280px · /school.html'].map(shot);
  assert.deepEqual(pairBeforeAfter(stored).map((a) => a.name), [
    'Trước · 375px · /school.html', 'Sau · 375px · /school.html',
    'Trước · 1280px · /school.html', 'Sau · 1280px · /school.html',
  ]);
});

test('already ordered, unrelated or mixed attachments are left exactly as they are', () => {
  const ordered = ['Trước · 375px · /a', 'Sau · 375px · /a'].map(shot);
  assert.deepEqual(pairBeforeAfter(ordered), ordered);
  const mixed = [shot('Sau · 375px · /a'), { name: 'ghi-chu.txt', mime: 'text/plain', url: '/u/x' }];
  assert.deepEqual(pairBeforeAfter(mixed), mixed);
  assert.deepEqual(pairBeforeAfter(undefined), []);
});

test('zoom steps by 1.5x and stays between fit (1) and 6x', async () => {
  const { zoomStep, ZOOM_MIN, ZOOM_MAX } = await import('../public/js/lightbox.js');
  assert.equal(zoomStep(1, 1), 1.5);
  assert.equal(zoomStep(1.5, 1), 2.25);
  assert.equal(zoomStep(2.25, -1), 1.5);
  assert.equal(zoomStep(1, -1), ZOOM_MIN);
  assert.equal(zoomStep(5, 1), ZOOM_MAX);
  assert.equal(zoomStep(ZOOM_MAX, 1), ZOOM_MAX);
});
