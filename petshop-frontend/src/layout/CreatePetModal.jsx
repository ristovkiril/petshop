import React from "react";
import {Button, Fade, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {toast} from "react-toastify";
import {PetType} from "../consts/PetType.js";
import {useFormik} from "formik";
import * as yup from "yup";
import axios from "../axios/axios.jsx";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: "280px",
    maxHeight: "80vh",
    bgcolor: 'background.paper',
    borderRadius: "0.75rem",
    border: '0px solid #000',
    boxShadow: 24,
    px: 3,
    py: 3,
    overflowY: "auto"
};

const validationSchema = yup.object().shape(
    {
        name: yup.string().required('Name is required'),
        description: yup.string(),
        type: yup.string()
            .required('Type is required')
            .matches(/^(CAT|DOG)$/, 'Type must be CAT or DOG'),
        dateOfBirth: yup.date().required('Date of Birth is required'),
        rating: yup.number().min(0).max(10)
    }
);


export const CreatePetModal = ({open, handleClose}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            dateOfBirth: '',
            type: PetType.CAT,
            rating: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try{
                const response = await axios.post("/api/pet/create", values)
                toast.success(`${values.name} is added on list.`);
                onClose();
            } catch (err) {
                toast.error(err?.response?.data?.message || "Failed to create new Pet");
            }
        },
    });


    const onClose = () => {
        formik.setValues({
            name: '',
            description: '',
            dateOfBirth: '',
            type: PetType.CAT,
            rating: 0,
        });
        handleClose();
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open} timeout={500}>
                <Stack
                    component={"form"}
                    onSubmit={formik.handleSubmit}
                    direction={"column"} gap={2} sx={style}>
                    <Typography variant={"h4"} fontWeight={"bold"} sx={{mb: 1}}>Add new Pet</Typography>
                    <TextField
                        label={"Name"}
                        name={"name"}
                        type={"text"}
                        size={"small"}
                        fullWidth
                        InputProps={{ sx: {borderRadius: 6} }}
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                        label={"Description"}
                        name={"description"}
                        type={"text"}
                        size={"small"}
                        fullWidth
                        InputProps={{ sx: {borderRadius: 6} }}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                    <TextField
                        label={"Birth"}
                        name={"dateOfBirth"}
                        type={"date"}
                        size={"small"}
                        fullWidth
                        InputProps={{ sx: {borderRadius: 6} }}
                        InputLabelProps={{shrink: true}}
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    />
                    <FormControl>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId={"type-label"}
                            name={"type"}
                            type={"text"}
                            size={"small"}
                            label={"Type"}
                            fullWidth
                            InputProps={{ sx: {borderRadius: 6} }}
                            value={formik.values.type}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.type && Boolean(formik.errors.type)}
                            helperText={formik.touched.type && formik.errors.type}
                        >
                            <MenuItem value={"none"}><em>None</em></MenuItem>
                            <MenuItem value={PetType.DOG}>Dog</MenuItem>
                            <MenuItem value={PetType.CAT}>Cat</MenuItem>
                        </Select>
                    </FormControl>
                    {
                        formik.values.type === PetType.DOG &&
                        <TextField
                            label={"Rating"}
                            name={"rating"}
                            type={"number"}
                            size={"small"}
                            fullWidth
                            InputProps={{ sx: {borderRadius: 6} }}
                            value={formik.values.rating}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.rating && Boolean(formik.errors.rating)}
                            helperText={formik.touched.rating && formik.errors.rating}
                        />
                    }
                    <Stack direction={'row'} gap={1} useFlexGap flexWrap={"wrap"}>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            type={"submit"}
                            sx={{borderRadius: 5, textTransform: "capitalize"}}
                        >
                            Save
                        </Button>
                        <Button
                            variant={"outlined"}
                            color={"secondary"}
                            sx={{borderRadius: 5, textTransform: "capitalize"}}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Fade>
        </Modal>
    )
}
