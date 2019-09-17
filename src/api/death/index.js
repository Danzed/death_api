import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Death, { schema } from './model'

const router = new Router()
const { title, start, timestamps } = schema.tree

/**
 * @api {post} /deaths Create death
 * @apiName CreateDeath
 * @apiGroup Death
 * @apiParam title Death's title.
 * @apiParam start Death's start.
 * @apiParam timestamps Death's timestamps.
 * @apiSuccess {Object} death Death's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Death not found.
 */
router.post('/',
  body({ title, start, timestamps }),
  create)

/**
 * @api {get} /deaths Retrieve deaths
 * @apiName RetrieveDeaths
 * @apiGroup Death
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of deaths.
 * @apiSuccess {Object[]} rows List of deaths.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /deaths/:id Retrieve death
 * @apiName RetrieveDeath
 * @apiGroup Death
 * @apiSuccess {Object} death Death's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Death not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /deaths/:id Update death
 * @apiName UpdateDeath
 * @apiGroup Death
 * @apiParam title Death's title.
 * @apiParam start Death's start.
 * @apiParam timestamps Death's timestamps.
 * @apiSuccess {Object} death Death's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Death not found.
 */
router.put('/:id',
  body({ title, start, timestamps }),
  update)

/**
 * @api {delete} /deaths/:id Delete death
 * @apiName DeleteDeath
 * @apiGroup Death
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Death not found.
 */
router.delete('/:id',
  destroy)

export default router
