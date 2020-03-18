import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsService.getNonSensitivePatients();
    res.json(patients);
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

export default router;