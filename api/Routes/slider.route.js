import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/slider.controller.js'
const sliderRouter = express.Router()
sliderRouter.route('/').post(create).get(getAll)
sliderRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default sliderRouter