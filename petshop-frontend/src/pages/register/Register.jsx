import React, {useContext} from "react";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import logo from "/pet-logo.jpg"
import {deepPurple, grey} from "@mui/material/colors";
import {Link} from "react-router-dom";
import * as yup from 'yup';
import {useFormik} from "formik";
import {IconChevronRight} from "@tabler/icons-react";
import {SignInContext} from "../../context/SignInContext.jsx";

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    name: yup
        .string('Enter your name')
        .required('Name is required'),
    lastname: yup
        .string('Enter your lastname')
        .required('Lastname is required'),
    budged: yup
        .number('Enter your budged')
        .required('Budged is required'),
});

export const Register = () => {
    const {onRegister} = useContext(SignInContext);
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            name: '',
            lastname: '',
            budged: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await onRegister(values)
        },
    });

    return (
        <Stack
            direction={"column"}
            gap={1}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                width: "100vw",
                height: "100dvh",
                bgcolor: grey[100]
            }}
        >
            <Stack
                component={"form"}
                onSubmit={formik.handleSubmit}
                direction={"column"}
                gap={2}
                alignItems={"center"}
                sx={{
                    borderRadius: '1rem',
                    boxShadow: 3,
                    p: 3,
                    bgcolor: "#FFF",
                    textAlign: "center",
                    minWidth: {xs: "90vw", sm: "50vw", md: "35vw", lg: "20vw"}
                }}
            >
                <img src={logo} alt={'pet logo'} width={150} height={'auto'}/>
                <Typography fontSize={30}>Welcome to Pet Shop</Typography>
                <Typography fontSize={16}>Already have an account? <Link to={"/login"} style={{color: deepPurple[400]}}>Sign in</Link></Typography>
                <TextField
                    label={"Email"}
                    name={"email"}
                    type={"email"}
                    size={"small"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    label={"Password"}
                    type={"password"}
                    name={"password"}
                    size={"small"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    label={"Name"}
                    type={"text"}
                    size={"small"}
                    name={"name"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    label={"Lastname"}
                    type={"text"}
                    size={"small"}
                    name={"lastname"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />
                <TextField
                    label={"Budged"}
                    type={"number"}
                    size={"small"}
                    name={"budged"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.budged}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.budged && Boolean(formik.errors.budged)}
                    helperText={formik.touched.budged && formik.errors.budged}
                />
                <Button
                    variant={"contained"}
                    fullWidth
                    type={"submit"}
                    color={"secondary"}
                    sx={{
                        color: "#FFF",
                        borderRadius: 5,
                    }}
                >
                    Register <IconChevronRight size={15} />
                </Button>
            </Stack>

        </Stack>
    )
}