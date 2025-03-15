import express from 'express';
import { submitResource, getResource } from '../controllers/resourceController.js';

const router = express.Router();

router.post('/submit', submitResource);
router.get('/resource', getResource);

export default router