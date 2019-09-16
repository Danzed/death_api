import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Death } from '.'

const app = () => express(apiRoot, routes)

let death

beforeEach(async () => {
  death = await Death.create({})
})

test('POST /deaths 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ date: 'test', hours: 'test', user: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.user).toEqual('test')
})

test('GET /deaths 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /deaths/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${death.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(death.id)
})

test('GET /deaths/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /deaths/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${death.id}`)
    .send({ date: 'test', hours: 'test', user: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(death.id)
  expect(body.date).toEqual('test')
  expect(body.hours).toEqual('test')
  expect(body.user).toEqual('test')
})

test('PUT /deaths/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ date: 'test', hours: 'test', user: 'test' })
  expect(status).toBe(404)
})

test('DELETE /deaths/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${death.id}`)
  expect(status).toBe(204)
})

test('DELETE /deaths/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
