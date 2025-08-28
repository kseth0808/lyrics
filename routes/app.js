import express from 'express';
import { postGetLyircs } from '../lyrics/lyics.js';

const router = express.Router();

router.post("/postLyrics", postGetLyircs)

export default router;