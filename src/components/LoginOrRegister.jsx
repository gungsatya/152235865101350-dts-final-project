import {
  Alert,
  AlertTitle,
  Box,
  Button,
  styled,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../authentication/firebase.js";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px 0",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #FFFFFF",
  "& .MuiOutlinedInput-input": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#fff",
  },
}));

export default function LoginOrRegister(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, isLoading, error] = useAuthState(auth);

  function _emailOnChange(event) {
    setEmail(event.target.value);
  }

  function _passwordOnChange(event) {
    setPassword(event.target.value);
  }

  function _formCallback(event) {
    event.preventDefault();
    props.formOnSubmit(email, password);
  }

  return (
    <Box
      component="form"
      noValidate
      sx={{ mt: 1, width: "100%" }}
      onSubmit={_formCallback}
    >
      {(error || props.error) && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error ?? props.error}
        </Alert>
      )}
      <StyledTextField
        margin="normal"
        required
        fullWidth
        id="email"
        name="email"
        placeholder="Email"
        type="text"
        autoComplete="email"
        variant="outlined"
        value={email}
        autoFocus
        onChange={_emailOnChange}
      />
      <StyledTextField
        margin="normal"
        required
        fullWidth
        id="password"
        name="password"
        placeholder="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password}
        onChange={_passwordOnChange}
      />
      <StyledButton
        type="submit"
        fullWidth
        variant="contained"
        color="secondary"
        size="large"
        disabled={isLoading}
      >
        {props.type === "login" ? "Login" : "Register"}
      </StyledButton>
    </Box>
  );
}
