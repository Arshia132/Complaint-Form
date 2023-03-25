import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";



const initialFValues = {

    Name: '',
    Address: '',
    Ward: '',
    Tag: '',
    Image: '',
    
}

export default function EmployeeForm() {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Address' in fieldValues)
            temp.Address = (/$^|.+@.+..+/).test(fieldValues.Address) ? "" : "Email is not valid."
        if ('Ward' in fieldValues)
            temp.Ward = fieldValues.Ward.length > 9 ? "" : "Minimum 10 numbers required."
        if ('Tag' in fieldValues)
            temp.Tag = fieldValues.Tag.length != 0 ? "" : "This field is required."
            
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            employeeService.insertEmployee(values)
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="Name"
                        label="Name"
                        value={values.Name}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />
                    <Controls.Input
                        label="Address"
                        name="Address"
                        value={values.Address}
                        onChange={handleInputChange}
                        error={errors.Address}
                    />
                    <Controls.Input
                        label="Ward"
                        name="Ward"
                        value={values.mobile}
                        onChange={handleInputChange}
                        error={errors.mobile}
                    />
             
                    <Controls.Select
                        name="Tag"
                        label="Tag"
                        value={values.Tag}
                        onChange={handleInputChange}
                        options={employeeService.getTagCollection()}
                        error={errors.Tag}
                    />
                      <Controls.Input
                        label="Image"
                        name="Image"
                        value={values.Image}
                        onChange={handleInputChange}
                        error={errors.Image}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                       
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
