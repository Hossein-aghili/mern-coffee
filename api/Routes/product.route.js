import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/product.controller.js'
const productRouter = express.Router()
productRouter.route('/').post(create).get(getAll)
productRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default productRouter