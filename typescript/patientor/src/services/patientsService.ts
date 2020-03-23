import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  Entry,
  NewEntry,
  NewBaseEntry,
  HospitalEntry,
  NewHospitalEntry,
  OccupationalHealthCareEntry,
  NewOccupationalHealthCareEntry,
  HealthCheckEntry,
  NewHealthCheckEntry,
 } from '../types';
import { parseString } from '../utils';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
    return patients.map((patient) => ({
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation,
  }));
};

const getPatient = (id: unknown): Patient | undefined => {
  try {
    const patientId = parseString(id);
    const patient = patients.find((patient) => patient.id === patientId);
    return patient;
  } catch (e) {
    throw new Error(`Incorrect or missing id: ${id}`);
  }
};

const addPatient = (newPatient: NewPatient): Patient => {
    const id = uuidv4();
    const addedPatient: Patient = {
        id,
        ...newPatient,
    };
    patients.push(addedPatient);
    console.log('Added patient:');
    console.log(addedPatient);
  return addedPatient;
};

const checkBaseEntryFields = (entry: NewBaseEntry): void => {
  if (!entry.date) {
    throw new Error('Date is missing');
  }
  if (!entry.description) {
    throw new Error('Description is missing');
  }
  if (!entry.specialist) {
    throw new Error('Specialist is missing');
  }
};

const parseHospitalEntryFields = (entry: NewHospitalEntry): HospitalEntry => {
  checkBaseEntryFields(entry);
  if (!entry.discharge) {
    throw new Error('Discharge is missing');
  }
  if (!entry.discharge.date) {
    throw new Error('Discharge date is missing');
  }
  if (!entry.discharge.criteria) {
    throw new Error('Discharge criteria is missing');
  }
  const hospitalEntry = {
    id: uuidv4(),
    ...entry
  };
  return hospitalEntry;
};

const parseOccupationalHealthCareEntry = (entry: NewOccupationalHealthCareEntry): OccupationalHealthCareEntry => {
  checkBaseEntryFields(entry);
  if (!entry.employerName) {
    throw new Error('Employer\'s name is missing');
  }
  const occupationalHealthCareEntry = {
    id: uuidv4(),
    ...entry
  };
  return occupationalHealthCareEntry;
};

const parseHealthCheckEntry = (entry: NewHealthCheckEntry): HealthCheckEntry => {
  checkBaseEntryFields(entry);
  if (entry.healthCheckRating === undefined || entry.healthCheckRating === null) {
    throw new Error('Health check rating is missing');
  }
  const healthCheckEntry = {
    id: uuidv4(),
    ...entry
  };
  return healthCheckEntry;
};

const addEntry = (patient: Patient, entry: NewEntry): Entry => {
  switch (entry.type) {
    case "Hospital":
      const hospitalEntry = parseHospitalEntryFields(entry as NewHospitalEntry);
      patient.entries.push(hospitalEntry);
      break;
    case "OccupationalHealthcare":
      const occupationalHealthCareEntry = parseOccupationalHealthCareEntry(entry as NewOccupationalHealthCareEntry);
      patient.entries.push(occupationalHealthCareEntry);
      break;
    case "HealthCheck":
      const healthCheckEntry = parseHealthCheckEntry(entry as NewHealthCheckEntry);
      patient.entries.push(healthCheckEntry);
      break;
    default:
      throw new Error(`Unimplemented entry type: ${entry.type}`);
  }
  patients.forEach((pat) => {
    if (pat.id === patient.id) {
      pat = patient;
    }
  });
  return patient.entries.slice(-1)[0];
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry
};