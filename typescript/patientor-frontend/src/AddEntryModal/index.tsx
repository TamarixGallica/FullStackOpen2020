import React, { useState } from 'react';
import { Modal, Segment, Dropdown, Container } from 'semantic-ui-react';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from './AddHealthCheckEntryForm';
import AddOccupationalHealthCareEntryForm, { OccupationalHealthCareEntryFormValues } from './AddOccupationalHealthCareEntryForm';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';

export type EntryFormValues =
  | HealthCheckEntryFormValues
  | OccupationalHealthCareEntryFormValues
  | HospitalEntryFormValues;

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}


enum FormType {
  "HealthCheck" = 0,
  "OccupationalHealthCare" = 1,
  "HospitalEntry" = 2,
}

const formTypeOptions = [
  {
    key: FormType.HealthCheck,
    text: "Health check",
    value: FormType.HealthCheck,
  },
  {
    key: FormType.OccupationalHealthCare,
    text: "Occupational healthcare",
    value: FormType.OccupationalHealthCare,
  },
  {
    key: FormType.HospitalEntry,
    text: "Hospital Entry",
    value: FormType.HospitalEntry,
  }
];

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [formType, setFormType] = useState(FormType.HealthCheck);
  const handleFormTypeChange = (event: React.SyntheticEvent<HTMLElement, Event>) => {
    const visibleSelection = (event.target as HTMLElement).textContent;
    switch (visibleSelection) {
      case "Health check":
        setFormType(FormType.HealthCheck);
        break;
      case "Occupational healthcare":
        setFormType(FormType.OccupationalHealthCare);
        break;
      case "Hospital Entry":
        setFormType(FormType.HospitalEntry);
        break;
      default:
        throw new Error(`Unhandled selection: ${visibleSelection}`);
    }
  };
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <Container textAlign="right">
          Entry type:{' '}
          <Dropdown
            selection
            options={formTypeOptions}
            value={formType}
            onChange={handleFormTypeChange}
          />
        </Container>
      </Modal.Content>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {
          formType === FormType.HealthCheck
          && <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} />
        }
        {
          formType === FormType.OccupationalHealthCare
          && <AddOccupationalHealthCareEntryForm onSubmit={onSubmit} onCancel={onClose} />
        }
        {
          formType === FormType.HospitalEntry
          && <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
        }
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;
