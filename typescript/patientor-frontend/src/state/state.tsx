import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: Map<string, Diagnosis>;
};

const initialState: State = {
  patients: {},
  diagnoses: new Map<string, Diagnosis>(),
};

export const setPatientList = (patients: Array<Patient>): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients
  };
};

export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patient
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const setDiagnosisCodes = (diagnoses: Array<Diagnosis>): Action => {
  return {
    type: "SET_DIAGNOSES_LIST",
    payload: diagnoses
  };
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
