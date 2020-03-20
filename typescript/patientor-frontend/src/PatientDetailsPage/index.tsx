import React from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";
import SexSymbol from "./sexSymbol";
import PatientEntry from "./patientEntry";

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
        dispatch(setPatientDetails(patientDetailsFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !patient.ssn) {
      fetchPatientDetails();
    }
  }, [dispatch, patient, id]);

  return (
    <div className="App">
      {
        patient
        && <Container>
            <h3>{patient.name} <SexSymbol gender={patient.gender} /></h3>
            <p>
              ssn: {patient.ssn}<br/>
              occupation: {patient.occupation}<br/>
            </p>
            <h4>entries</h4>
            {
              patient.entries
              &&
                patient.entries.map((entry, index) => (
                  <PatientEntry entry={entry} key={index} />
                ))
            }
          </Container>
      }
    </div>
  );
};

export default PatientListPage;
