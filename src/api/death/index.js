import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Death, { schema } from './model'

const router = new Router()
const { date, hours, user } = schema.tree

/**
 * @api {post} /deaths Create death
 * @apiName CreateDeath
 * @apiGroup Death
 * @apiParam date Death's date.
 * @apiParam hours Death's hours.
 * @apiParam user Death's user.
 * @apiSuccess {Object} death Death's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Death not found.
 */
router.post('/',
  body({ date, hours, user }),
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
 * @apiParam date Death's date.
 * @apiParam hours Death's hours.
 * @apiParam user Death's user.
 * @apiSuccess {Object} death Death's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Death not found.
 */
router.put('/:id',
  body({ date, hours, user }),
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
