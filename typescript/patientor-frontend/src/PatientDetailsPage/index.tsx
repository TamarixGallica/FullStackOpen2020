import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import SexSymbol from "./sexSymbol";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT_DETAILS", payload: patientDetailsFromApi});
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !patient.ssn) {
      fetchPatientDetails();
    }
  }, [dispatch, patient]);

  return (
    <div className="App">
      {
        patient
        && <Container>
            <h3>{patient.name} <SexSymbol gender={patient.gender} /></h3>
            <p>
              ssn: {patient.ssn}<br/>
              occupation: {patient.occupation}
            </p>
          </Container>
      }
    </div>
  );
};

export default PatientListPage;
