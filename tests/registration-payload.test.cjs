const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../app/register/registration-payload.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
const loaded = { exports: {} };
new Function('exports', compiled)(loaded.exports);
const { getRegistrationPayload, validateRegistrationPayload } = loaded.exports;
const fields = { firstname: ' Juan ', lastname: ' Cruz ', phone: '9171234567', groupName: ' Savings Group ', slug: 'savings-group', password: ' password123 ' };
const form = values => { const data = new FormData(); for (const [key, value] of Object.entries(values)) data.set(key, value); return data; };

test('sends the exact backend keys, trims names, preserves password and local phone', () => {
  const payload = getRegistrationPayload(form({ ...fields, extra: 'ignored' }));
  assert.deepEqual(payload, { firstname: 'Juan', lastname: 'Cruz', phone: '9171234567', groupName: 'Savings Group', slug: 'savings-group', password: ' password123 ' });
  assert.equal(validateRegistrationPayload(payload), '');
});
test('rejects missing and whitespace-only fields', () => {
  assert.ok(validateRegistrationPayload(getRegistrationPayload(new FormData())));
  assert.ok(validateRegistrationPayload(getRegistrationPayload(form({ ...fields, firstname: '   ' }))));
});
test('enforces password minimum and UTF-8 byte maximum without truncation', () => {
  for (const password of ['1234567', 'a'.repeat(73), 'é'.repeat(37), '😀'.repeat(19)]) {
    const payload = getRegistrationPayload(form({ ...fields, password }));
    assert.equal(payload.password, password);
    assert.ok(validateRegistrationPayload(payload));
  }
  for (const password of ['12345678', 'a'.repeat(72), 'é'.repeat(36), '😀'.repeat(18)]) {
    assert.equal(validateRegistrationPayload(getRegistrationPayload(form({ ...fields, password }))), '');
  }
});
