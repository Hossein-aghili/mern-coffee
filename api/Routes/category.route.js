import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/category.controller.js'
const categoryRouter = express.Router()
categoryRouter.route('/').post(create).get(getAll)
categoryRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default categoryRouter