import { Button, Grid, Stack, styled, alpha } from "@mui/material";
import LoginOrRegister from "../components/LoginOrRegister";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

import {
  loginUserWithEmailPassword,
  loginWithGithub,
  loginWithGoogle,
} from "../authentication/firebase.js";
import { useState } from "react";
import Auth from "../components/templates/Auth";
import { blue } from "@mui/material/colors";

const StyledButton = styled(Button)({
  backgroundColor: blue[50],
  color: "#141414",
  width: "100%",
  "&:hover": {
    backgroundColor: alpha(blue[50], 0.8),
  },
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null);

  async function _login(email, password) {
    const response = await loginUserWithEmailPassword(email, password);
    if (response.status) {
      navigate("/");
    } else {
      setLoginError(response.error.code);
    }
  }

  async function _loginWithGoogle() {
    const response = await loginWithGoogle();
    if (response.status) {
      navigate("/");
    } else {
      setLoginError(response.error.code);
    }
  }

  async function _loginWithGithub() {
    const response = await loginWithGithub();
    if (response.status) {
      navigate("/");
    } else {
      setLoginError(response.error.code);
    }
  }

  return (
    <Auth>
      <Stack
        direction="column"
        alignItems="strech"
        justifyContent="center"
        sx={{ height: "100%" }}
        gap={2}
      >
        <LoginOrRegister
          formOnSubmit={_login}
          type="login"
          error={loginError}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <StyledButton
              startIcon={<GoogleIcon />}
              variant="contained"
              onClick={_loginWithGoogle}
            >
              Login with Google
            </StyledButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledButton
              startIcon={<GitHubIcon />}
              variant="contained"
              onClick={_loginWithGithub}
            >
              Login with Github
            </StyledButton>
          </Grid>
        </Grid>

        <Button variant="text" color="info" component={Link} to="/register">
          I have no account
        </Button>
      </Stack>
    </Auth>
  );
}
