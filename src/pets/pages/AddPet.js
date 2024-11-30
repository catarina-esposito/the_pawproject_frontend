import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Box, Button, Heading } from "react-bulma-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNotification } from "../../components/Notification/Notification";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../shared/util/const";
import TextField from "../../components/TextField/TextField";

const AddPet = () => {
  const [loading, setLoading] = useState(false);
  const [notification, showNotification] = useNotification();
  const history = useHistory();

  const initialValues = {
    name: "",
    age: "",
    description: "",
    adoptionStatus: "Available",
    photoURL: "",
    breed: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .required("Age is required")
      .min(0, "Age must be a positive number"),
    description: Yup.string().required("Description is required"),
    photoURL: Yup.string().required("Photo URL is required"),
    breed: Yup.string().required("Breed URL is required"),
    adoptionStatus: Yup.string()
      .required("Status is required")
      .oneOf(["Available", "Unavailable"], "Invalid status"),
  });

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        showNotification(false, "User is not authenticated");
        setLoading(false);
        return;
      }

      const response = await fetch(`${baseURL}/pets/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        showNotification(true, "Pet added successfully");
        history.push("/");
      } else {
        showNotification(false, "Failed to add pet");
      }
    } catch (err) {
      console.error(err);
      showNotification(false, "An error occurred while adding the pet");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {notification}
      <Box>
        <Heading size={3}>Add New Pet</Heading>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <TextField
                label="Photo UR"
                name="photoURL"
                value={"photoURL"}
                disabled={false}
              />
              <TextField
                label="Name"
                name="name"
                value={"name"}
                disabled={false}
              />
              <TextField
                label="Breed"
                name="breed"
                value={"breed"}
                disabled={false}
              />

              <div className="field">
                <label className="label">Age</label>
                <Field className="input" name="age" type="number" />
                {errors.age && touched.age && (
                  <p className="help is-danger">{errors.age}</p>
                )}
              </div>

              <div className="field">
                <label className="label">Description</label>
                <Field className="textarea" as="textarea" name="description" />
                {errors.description && touched.description && (
                  <p className="help is-danger">{errors.description}</p>
                )}
              </div>

              <div className="field">
                <label className="label">Adoption Status</label>
                <Field as="select" name="adoptionStatus" className="input">
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </Field>
                {errors.adoptionStatus && touched.adoptionStatus && (
                  <p className="help is-danger">{errors.adoptionStatus}</p>
                )}
              </div>

              <div className="buttons">
                <Button type="submit" color="success" disabled={isSubmitting}>
                  Add Pet
                </Button>
                <Button
                  type="button"
                  color="warning"
                  onClick={() => history.push("/")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default AddPet;
