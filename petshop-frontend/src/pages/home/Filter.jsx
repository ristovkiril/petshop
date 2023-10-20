import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TablePagination,
    TextField
} from "@mui/material";
import {PetType} from "../../consts/PetType.js";
import React from "react";

export const Filter = ({filterParams, setFilterParams}) => {
    return (
        <Stack direction={"row"} gap={1.5} alignItems={"flex-start"} useFlexGap flexWrap={"wrap"}>
            <TextField
                size={"small"}
                value={filterParams?.name}
                label={"Name"}
                placeholder={"Search by name"}
                InputProps={{sx: {borderRadius: 5}}}
                onChange={(e) => setFilterParams(prev => {
                    return {...prev, name: e.target.value}
                })}
            />
            <FormControl>
                <InputLabel id="type-label">Type</InputLabel>
                <Select
                    labelId={"type-label"}
                    size={"small"}
                    label={"Type"}
                    sx={{borderRadius: 5}}
                    value={filterParams.type || "none"}
                    onChange={(e) => setFilterParams(prev => {
                        const value = e.target.value === "none" ? null : e.target.value;
                        return {...prev, type: value}
                    })}
                >
                    <MenuItem value={"none"}><em>None</em></MenuItem>
                    <MenuItem value={PetType.DOG}>Dog</MenuItem>
                    <MenuItem value={PetType.CAT}>Cat</MenuItem>
                </Select>
            </FormControl>
            <TextField
                size={"small"}
                type={"number"}
                value={filterParams?.price}
                label={"Price"}
                placeholder={"0"}
                sx={{width: "7rem"}}
                helperText={"Maximum price"}
                InputProps={{sx: {borderRadius: 5}}}
                onChange={(e) => setFilterParams(prev => {
                    return {...prev, price: e.target.value}
                })}
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filterParams.hasOwner}
                        size={"small"}
                        onChange={(e) => setFilterParams(prev => {
                            return {...prev, hasOwner: e.target.checked}
                        })}
                    />
                } label="Only available"
            />
            <TablePagination
                component="div"
                sx={{
                    ".MuiToolbar-gutters": {p: 0, justifyContent: "flex-start"},
                    ".MuiTablePagination-spacer": {display: "none"},
                    width: {xs: "100%", md: "auto"},
                    ml: {xs: 0, md: "auto"}
                }}
                count={filterParams?.totalElements}
                page={filterParams?.page}

                row
                onPageChange={(e, newPage) => setFilterParams(prev => {
                    return {...prev, page: newPage}
                })}
                onRowsPerPageChange={(e) => setFilterParams(prev => {
                    return {...prev, size: e.target.value, page: 0}
                })}
                rowsPerPage={filterParams?.size}
            />
        </Stack>
    )
}