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
    username: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(5, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const Login = () => {
    const {onLogin} = useContext(SignInContext);
    const formik = useFormik({
        initialValues: {
            username: 'admin@yahoo.com',
            password: 'p@ssw0rd',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
            await onLogin(values)
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
                <Typography fontSize={16}>Dont have account yet? <Link to={"/register"} style={{color: deepPurple[400]}}>Sign up</Link></Typography>
                <TextField
                    label={"Email"}
                    type={"email"}
                    size={"small"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}

                />
                <TextField
                    label={"Password"}
                    type={"password"}
                    size={"small"}
                    fullWidth
                    InputProps={{ sx: {borderRadius: 6} }}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}

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
                    Login <IconChevronRight size={15} />
                </Button>
            </Stack>

        </Stack>
    )
}