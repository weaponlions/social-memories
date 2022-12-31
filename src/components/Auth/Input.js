import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  type,
  handleShowPassword,
  half,
}) => {
  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          onChange={handleChange}
          variant="outlined"
          required
          fullWidth
          label={label}
          type={type}
          autoFocus={autoFocus}
          InputProps= { 
            name === "password" ? {
            endAdornment : (
                <InputAdornment position='end' >
                    <IconButton onClick={handleShowPassword} >
                      {type === "password" ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment> 
            ) ,  
          } : {}
          } /> 
      </Grid>
    </>
  );
};

export default Input
