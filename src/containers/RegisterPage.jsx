import { Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LoginOrRegister from "../components/LoginOrRegister";

import { registerUserWithEmailPassword } from "../authentication/firebase.js";
import Auth from "../components/templates/Auth";
import { useState } from "react";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [regisError, setRegisError] = useState(null);

  function _register(email, password) {
    const response = registerUserWithEmailPassword(email, password);
    if (response.status) {
      navigate("/profiles");
    } else {
      setRegisError(response.error.code);
    }
  }

  return (
    <Auth>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <LoginOrRegister
          formOnSubmit={_register}
          type="register"
          error={regisError}
        />
        <Button variant="text" color="info" component={Link} to="/login">
          I have existing account
        </Button>
      </Stack>
    </Auth>
  );
}
