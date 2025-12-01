import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/blog.controller.js'
const blogRouter = express.Router()
blogRouter.route('/').post(create).get(getAll)
blogRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default blogRouter