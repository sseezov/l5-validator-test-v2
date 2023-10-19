// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('task1', () => {
  const validator = new Validator();

  const schema1 = validator.string();
  assert.equal(schema1.isValid('Hexlet'), true);
  assert.equal(schema1.isValid(''), true);
  assert.equal(schema1.isValid(true), false);
  assert.equal(schema1.isValid(123), false);
  assert.equal(schema1.isValid(), false);
});

test('task2', () => {
  const validator = new Validator();
  const schema1 = validator.string().startsFromUpperCase();

  assert.equal(schema1.isValid(''), false);
  assert.equal(schema1.isValid('Hexlet'), true);
  assert.equal(schema1.isValid(' '), false);
  assert.equal(schema1.isValid('!H!'), false);
  assert.equal(schema1.isValid('1H!'), false);
  assert.equal(schema1.isValid('3H!'), false);
  assert.equal(schema1.isValid('0H!'), false);

  const schema2 = validator.string().length(5).startsFromUpperCase();
  assert.equal(schema2.isValid('hexlet'), false);
  assert.equal(schema2.isValid(' hello?'), false);
  assert.equal(schema2.isValid('Hieee'), true);
  assert.equal(schema2.isValid('!Hide'), false);

  const schema3 = validator.string().length(5).startsFromUpperCase().hasExclamation();
  assert.equal(schema3.isValid('hexlet'), false);
  assert.equal(schema3.isValid(' hello?'), false);
  assert.equal(schema3.isValid('Hieee'), false);
  assert.equal(schema3.isValid('Hide!'), true);

  const schema4 = validator.string().hasExclamation().length(5);
  assert.equal(schema4.isValid('hexle'), false);
  assert.equal(schema4.isValid(' hello?'), false);
  assert.equal(schema4.isValid('Hieee'), false);
  assert.equal(schema4.isValid('Hide!'), true);
});

test('task3', () => {
  const validator = new Validator();
  const schema = validator.array();

  assert.equal(schema.isValid('Hello!'), false);
  assert.equal(schema.isValid(123), false);
  assert.equal(schema.isValid([]), true);
  assert.equal(schema.isValid([1, 23, 4]), true);
  assert.equal(schema.isValid({}), false);
  assert.equal(schema.isValid(() => { }), false);
});

test('task4', () => {
  const validator = new Validator();
  const schema1 = validator.array().maxDepth(1);
  const schema2 = validator.array().maxDepth(8);
  const schema3 = validator.array().maxDepth(3);

  assert.equal(schema1.isValid(null), false);
  assert.equal(schema1.isValid([]), true);
  assert.equal(schema1.isValid([1, 2, 3, 4]), true);
  assert.equal(schema1.isValid([0, 0, 0, 0, [1], [1, [2]]]), false);

  assert.equal(schema2.isValid([1, 2, 3, [[[[[]]]]]]), true);
  assert.equal(schema2
    .isValid([1, [2], [1, [2, [3, [4, [5, [6, [7, [8, [9, [10, [11]]]]]]]]]]]]), false);

  assert.equal(schema3.isValid([1, 2, 3, [1, [2], [1, [2]], [1, [2, [3, [4]]]]]]), false);
  assert.equal(schema3.isValid([[1], [[2]], [[[3]]]]), true);
});

test('task5', () => {
  const validator = new Validator();
  const schema1 = validator.object().shape({
    name: validator.string().startsFromUpperCase(),
    basket: validator.array().maxDepth(1),
  });

  const schema2 = validator.object().shape({
    name: validator.string(),
    basket: validator.array().maxDepth(0),
    payment: validator.array().maxDepth(2),
  });

  assert.equal(schema1.isValid({ name: 'B11', basket: ['potatos', 'tomatos', 'oranges', ['carrots']] }), true);
  assert.equal(schema1.isValid({ name: '12', basket: ['potatos', 'tomatos', 'oranges'] }), false);
  assert.equal(schema1.isValid({}), false);

  assert.equal(schema2.isValid({ name: 'sergey', basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents', [0, [1]]] }), true);
  assert.equal(schema2.isValid({ name: 17, basket: ['apple', 'cucumber'], payment: ['10 dollars', '10 cents'] }), false);
  assert.equal(schema2.isValid({ name: '213', basket: ['apple'], payment: ['10 dollars', '10 cents'] }), true);
});
