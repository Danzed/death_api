import { success, notFound } from '../../services/response/'
import { Death } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Death.create(body)
    .then((death) => death.view(true))
    .then(success(res, 201))
    .catch((err) => {
      /* istanbul ignore else */
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          message: 'Do you already have a reserved time? If you don\'t have a reserved, try another time'
        })
      } else {
        res.status(500).json({
          valid: false,
          message: 'Error desconocido.',
          interno: err
        })
        // next(err)
      }
    })

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Death.count(query)
    .then(count => Death.find(query, select, cursor)
      .then((deaths) => ({
        count,
        rows: deaths.map((death) => death.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Death.findById(params.id)
    .then(notFound(res))
    .then((death) => death ? death.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Death.findById(params.id)
    .then(notFound(res))
    .then((death) => death ? Object.assign(death, body).save() : null)
    .then((death) => death ? death.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Death.findById(params.id)
    .then(notFound(res))
    .then((death) => death ? death.remove() : null)
    .then(success(res, 204))
    .catch(next)
