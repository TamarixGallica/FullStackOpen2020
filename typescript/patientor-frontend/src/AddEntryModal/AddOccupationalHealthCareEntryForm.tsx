import React, { useState } from "react";
import { Grid, Button, Checkbox } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { OccupationalHealthCareEntry, SickLeave } from "../types";
import { isValidDate } from "../utils";

export type OccupationalHealthCareEntryFormValues = Omit<OccupationalHealthCareEntry, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthCareEntryFormValues) => void;
  onCancel: () => void;
}

export const AddOccupationalHealthCareEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {

  const [{ diagnoses },] = useStateValue();
  const [sickLeaveChecked, setSickLeaveChecked] = useState(false);

  const toggleSickLeave = (): void => {
    setSickLeaveChecked(!sickLeaveChecked);
  };

  return (
    <Formik
      initialValues={{
        date: "",
        description: "",
        employerName: "",
        specialist: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        type: "OccupationalHealthcare",
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const dateFormatError = "Date is not in format YYYY-MM-DD";
        const errors: { [field: string]: string | SickLeave } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isValidDate(values.date)) {
          errors.date = dateFormatError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (sickLeaveChecked) {
          const sickLeave: SickLeave = { startDate: "", endDate: "" };
          if (!isValidDate(values.sickLeave.startDate)) {
            sickLeave.startDate = dateFormatError;
          }
          if (!isValidDate(values.sickLeave.endDate)) {
            sickLeave.endDate = dateFormatError;
          }
          if (sickLeave.startDate || sickLeave.endDate) {
            errors.sickLeave = sickLeave;
          }
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Name of the employer"
              placeholder="Name of the employer"
              name="employerName"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={[...diagnoses.values()]}
            />
            <Checkbox
              toggle
              label="Sick leave"
              checked={sickLeaveChecked}
              onClick={toggleSickLeave}
            />
            {
              sickLeaveChecked
              &&
              <>
                <Field
                  label="Sick leave from"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick leave to"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddOccupationalHealthCareEntryForm;
