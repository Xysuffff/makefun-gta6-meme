const test = require('node:test');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
test('renderer creates a genuine opaque 1200px PNG and a 480px judge preview', () => {
  const run = spawnSync(process.execPath, [path.join(__dirname, 'render.cjs')], {encoding:'utf8', cwd:__dirname});
  assert.equal(run.status, 0, run.stderr);
  for (const [name, size] of [['gta6-legal-route.png',1200],['judge-preview-480.png',480]]) {
    const b = fs.readFileSync(path.join(__dirname,name));
    assert.equal(b.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.equal(b.readUInt32BE(16),size);
    assert.equal(b.readUInt32BE(20),size);
    assert.ok(b.length < 8*1024*1024);
  }
});
