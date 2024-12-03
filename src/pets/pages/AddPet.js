import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Box, Button, Heading } from "react-bulma-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNotification } from "../../components/Notification/Notification";
import Loader from "../../components/Loader/Loader";
import { baseURL } from "../../shared/util/const";
import TextField from "../../components/TextField/TextField";
import ImageUpload from "./ImageUpload";
import dropPhoto from '../../static/images/drop_logo.svg';

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

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("age", values.age)
      formData.append("breed", values.breed)
      formData.append("description", values.description)
      formData.append("adoptionStatus", values.adoptionStatus)
      formData.append("file", values.imageFile)

      const response = await fetch(`${baseURL}/pets/add`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
        body: formData,
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
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
            <Form>
              <ImageUpload
                  image={values.photoURL || dropPhoto}
                  onChange={(files) => {
                      if (files.length === 0) {
                          return;
                      }
                      setFieldValue('photoURL', URL.createObjectURL(files[0]));
                      setFieldValue('imageFile', files[0]);
                  }}
                  isLogo={true}
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
              <TextField
                label="Age"
                name="age"
                value={"age"}
                type="number"
                disabled={false}
              />

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
