import React from 'react';
import { Field, useField, ErrorMessage } from 'formik';
import { Form } from 'react-bulma-components';
import '../../styles/Common.css';

const TextField = (props) => {
    const [field, meta] = useField(props);
    const customErrorComponent = props.customErrorComponent;
    const inputClass = props?.styleClass
        ? props?.styleClass
        : 'inputFormValue';
    return (
        <div className="mb-5">
            <Form.Field>
                <Form.Label
                    textColor={meta.error && meta.touched ? 'danger' : null}
                    className='formLabel'
                >
                    {props.label}
                </Form.Label>
                <Form.Control>
                    <Field
                        name={props.name}
                        placeholder={props.placeholder}
                        type={props.type}
                        as={Form.Input}
                        className={`${
                            meta.touched && meta.error && 'is-danger'
                        } ${inputClass}`}
                        value={field.value}
                        disabled={props.disabled}
                        color={meta.error && meta.touched ? 'danger' : null}
                    />
                </Form.Control>
            </Form.Field>
            {customErrorComponent ? (
                React.cloneElement(customErrorComponent, {
                    value: field.value,
                    error: meta.error
                })
            ) : (
                <div className="error-message">
                    <ErrorMessage name={field.name} />
                </div>
            )}
        </div>
    );
};

export default TextField;
