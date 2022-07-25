import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../authentication/firebase.js";

export default function UnProtectedAuth({ children }) {
  const [user, isLoading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profiles");
      return;
    }
  }, [user, navigate]);

  if (isLoading) return;
  else return children;
}
