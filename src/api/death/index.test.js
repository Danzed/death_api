import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Death } from '.'

const app = () => express(apiRoot, routes)

let death

beforeEach(async () => {
  death = await Death.create({ title: 'test', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808000 })
})

test('POST /deaths 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test2', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808001 })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test2')
  expect(body.start).toEqual('2019-09-18T12:00:00.000Z')
  expect(body.timestamps).toEqual(1568808001)
})

test('POST /deaths 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test2', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808000 })
  expect(status).toBe(409)
  expect(typeof body).toEqual('object')
  expect(body.valid).toEqual(false)
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
    .send({ title: 'test2', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808002 })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(death.id)
  expect(body.title).toEqual('test2')
  expect(body.start).toEqual('2019-09-18T12:00:00.000Z')
  expect(body.timestamps).toEqual(1568808002)
})

test('PUT /deaths/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test2', start: 'Wed Sep 18 2019 09:00:00 GMT-0300', timestamps: 1568808001 })
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
