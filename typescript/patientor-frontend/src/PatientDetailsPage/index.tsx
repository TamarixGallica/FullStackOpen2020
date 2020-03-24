import React from "react";
import axios from "axios";
import { Container, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails, addEntry } from "../state";
import SexSymbol from "./sexSymbol";
import PatientEntry from "./patientEntry";
import AddEntryModal from "../AddEntryModal";
import { HealthCheckEntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const patient = patients[id];

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${patient && patient.id}/entries`,
        values
      );
      dispatch(addEntry(patient, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
          </Container>
      }
    </div>
  );
};

export default PatientListPage;
