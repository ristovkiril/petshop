import React, {useContext, useState} from "react";
import {Button, Fade, IconButton, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    IconX
} from "@tabler/icons-react";
import Modal from "@mui/material/Modal";
import {grey} from "@mui/material/colors";
import {toast} from "react-toastify";
import {Context as AppContext} from "../../context/AppContext";
import {ProjectEntity} from "../../model/ModelData";
import {PetType} from "../consts/PetType.js";
import {useFormik} from "formik";
import * as yup from "yup";

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

const validationSchema = yup.object({
    name: yup
        .string('Enter name')
        .required('Name is required'),
    description: yup.string.notRequired(),
    type: yup
        .string('Enter type')
        .required('Type is required'),
    dateOfBirth: yup
        .date()
        .required("Date of birth is required"),
    rating: yup.number.notRequired("Enter rating")
});


export const CreatePetModal = ({open, handleClose}) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            dateOfBirth: '',
            type: PetType.CAT,
            rating: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values)
        },
    });
    const onCreate = async () => {

        onClose();
    }

    const onClose = () => {
        formik.setValues({
            name: '',
            description: '',
            dateOfBirth: '',
            type: PetType.CAT,
            rating: '',
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
                <Stack direction={"column"} gap={2} sx={style}>
                    <Typography variant={"h4"} fontWeight={"bold"} sx={{mb: 1}}>Create new project</Typography>
                    <TextField
                        size={"small"}
                        label={"Project name"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        size={"small"}
                        rows={3}
                        multiline
                        label={"Description"}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <Stack direction={'row'} gap={1} useFlexGap flexWrap={"wrap"}>
                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            sx={{borderRadius: 5, textTransform: "capitalize"}}
                            disabled={!name && !description}
                            onClick={onCreate}
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
