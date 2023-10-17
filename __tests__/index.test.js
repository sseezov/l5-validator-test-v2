// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('task1', () => {
  const validator = new Validator();
  const schema = validator.string();

  assert.equal(schema.isValid('Hexlet'), true);
  assert.equal(schema.isValid(''), true);
  assert.equal(schema.isValid(true), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid(), false);
});

test('task2', () => {
  const validator = new Validator();
  const schema1 = validator.startsFromUpperCase();

  assert.equal(schema1.isValid(''), false);
  assert.equal(schema1.isValid('Hexlet'), true);
  assert.equal(schema1.isValid(' '), false);
  assert.equal(schema1.isValid('!H!'), false);
  assert.equal(schema1.isValid('1H!'), false);
});

test('task3', () => {
  const validator = new Validator();
  const schema = validator.array();

  assert.equal(schema.isValid('Hello!'), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid([]), true);
  assert.equal(schema.isValid([1, 23, 4]), true);
});

test('task4', () => {
  const validator = new Validator();
  const schema1 = validator.array().depth(1);
  const schema2 = validator.array().depth(10);

  assert.equal(schema1.isValid(null), false);
  assert.equal(schema1.isValid([]), false);
  assert.equal(schema1.isValid([1, 2, 3, 4]), false);
  assert.equal(schema1.isValid([1, 2, 3, 4, []]), true);
  assert.equal(schema2.isValid([1, 2, 3, [[[[[]]]]]]), false);
  assert.equal(schema2.isValid([0, [1, [2, [3, [4, [5, [6, 7, [8, [9, [10]]]]]]]]]]), false);
});

test('task5', () => {
  const validator = new Validator();
  const schema1 = validator.object().shape({
    name: validator.string().startsFromUpperCase(),
    basket: validator.array().depth(1),
  });
  const schema2 = validator.object().shape({
    name: validator.string(),
    basket: validator.array().depth(0),
    payment: validator.array().depth(2),
  });

  assert.equal(schema1.isValid({ name: 'B11', basket: ['potatos', 'tomatos', 'oranges', ['carrots']] }), true);
  assert.equal(schema1.isValid({ name: '12', basket: ['potatos', 'tomatos', 'oranges'] }), false);
  assert.equal(schema1.isValid({}), false);

  assert.equal(schema2.isValid({ name: 'sergey', basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents', [[]]] }), true);
  assert.equal(schema2.isValid({ name: 17, basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents'] }), false);
  assert.equal(schema2.isValid({ name: '213', basket: ['apple'], payment: ['10 dollars', '10 cents'] }), false);
});
