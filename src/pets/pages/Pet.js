import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./Pets.css";
import { baseURL } from '../../shared/util/const';
import {useLoadEntity} from '../../shared/hooks/http-request-hook';
import { Box, Button, Columns, Container, Heading, Image, Tag } from 'react-bulma-components';
import { useMainContext } from "../../shared/context/MainContext";
import Loader from '../../components/Loader/Loader';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNotification } from '../../components/Notification/Notification';
import TextField from "../../components/TextField/TextField";


const Pet = () => {
    const { currentUser } = useMainContext();
    const history = useHistory();
    const { id } = useParams();
    const url = `${baseURL}/pets/${id}`;
    const [ loading, setLoading ] = useState(false);
    const [ petData, setPetData ] = useState(false);
    const { isLoading, data, error } = useLoadEntity(url);
    const [notification, showNotification] = useNotification();

    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        if (!petData && data) {
            setPetData(data);
        }
    }, [data, petData]);

    if (isLoading || loading) {
        return <Loader />;
    }

    if (error) {
        return <assert><p>Error loading pet data. Please try again later.</p></assert>;
    }

    const handleFormSubmit = async (values, { setSubmitting }) => {
        try {
            debugger;
            setLoading(true);
            let token = JSON.parse(localStorage.getItem("token"))
            if (!token) {
                setLoading(false);
                setIsEditing(false);
                return
            }
            const response = await fetch(`${baseURL}/pets/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token.token}`
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setLoading(false);
                setIsEditing(false);
                setPetData(updatedData);
                showNotification(true, 'Pet updated successfully');
            } else {
                showNotification(false, 'Failed to update pet');
            }
        } catch (err) {
            showNotification(false);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);
            const token = JSON.parse(localStorage.getItem("token"));
            if (!token) {
                showNotification(false, "User is not authenticated");
                setLoading(false);
                return;
            }

            const response = await fetch(`${baseURL}/pets/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token.token}`
                },
            });

            if (response.ok) {
                showNotification(true, 'Pet deleted successfully');
                history.push("/");
            } else {
                showNotification(false, 'Failed to delete pet');
            }
        } catch (err) {
            console.error(err);
            showNotification(false, 'An error occurred while deleting the pet');
        } finally {
            setLoading(false);
        }
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        age: Yup.number().required("Age is required").min(0, "Age must be a positive number"),
        description: Yup.string().required("Description is required"),
        photoURL: Yup.string().required("PhotoURL is required"),
        adoptionStatus: Yup.string()
            .required("Status is required")
            .oneOf(["Available", "Unavailable"], "Invalid status"),
    });

    return (
        <Container>
            {notification}
        <Box>
        {!isEditing ? (
                    <>
                        <Heading style={{textAlign: 'center', margin: '2em 0'}} size={1}>{petData.name}</Heading>
                        <Columns>
                        <Columns.Column size="half">
                            <Image src={petData.photoURL} alt={`${petData.name}'s photo`} size={500} />
                        </Columns.Column>

                        <Columns.Column>
                            <Columns.Column style={{textAlign: 'center', marginBottom: '2em'}} >
                                <Heading subtitle size={3}>
                                Age: {petData.age} years
                                </Heading>
                                <Tag 
                                    color={petData.adoptionStatus?.toLowerCase() === 'available' ? 'primary' : 'warning'}
                                    size="large"
                                >
                                    {petData.adoptionStatus}
                                </Tag>
                            </Columns.Column>

                            <p className="description">{petData.description}</p>
                            
                        </Columns.Column>
                        </Columns>

                        {/* Admin Buttons */}
                        {currentUser?.role === 'admin' && (
                        <Columns className="is-right mt-4">
                            <Columns.Column>
                            <Button color="warning" className="mr-2" onClick={() => setIsEditing(true)}>
                                Edit
                            </Button>
                            <Button color="danger" onClick={handleDelete}>Delete</Button>
                            </Columns.Column>
                        </Columns>
                        )}
                    </>
                ) : (
                    <Formik
                        initialValues={{
                            name: petData.name,
                            age: petData.age,
                            description: petData.description,
                            adoptionStatus: petData.adoptionStatus,
                            photoURL: petData.photoURL
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <Heading size={4}>Edit Pet</Heading>
                                <TextField
                                    label="Photo UR"
                                    name="photoURL"
                                    value={'photoURL'}
                                    disabled={false}
                                />
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={'name'}
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
                                    <div className="control">
                                        <Field className="textarea" as="textarea" name="description" />
                                        {errors.description && touched.description && (
                                            <p className="help is-danger">{errors.description}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Status</label>
                                    <div className="control">
                                        <Field as="select" name="adoptionStatus" className="input">
                                            <option value="Available">Available</option>
                                            <option value="Unavailable">Unavailable</option>
                                        </Field>
                                        {errors.adoptionStatus && touched.adoptionStatus && (
                                            <p className="help is-danger">{errors.adoptionStatus}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="buttons">
                                    <Button type="submit" color="success" disabled={isSubmitting}>
                                        Save
                                    </Button>
                                    <Button
                                        type="button"
                                        color="warning"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
        </Box>
        </Container>
    );
};


export default Pet;
