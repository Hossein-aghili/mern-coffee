import { fileURLToPath } from "url";
import path from "path";
import express from "express"
import cors from 'cors'
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express()
app.use(cors())
app.use(express.json())