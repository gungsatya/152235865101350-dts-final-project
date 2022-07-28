import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useSearchParams } from "react-router-dom";
import { auth } from "../../authentication/firebase.js";

export default function UnProtectedAuth({ children }) {
  const [user] = useAuthState(auth);
  const [queryStrings] = useSearchParams();

  const goto = queryStrings.get("goto") ?? "/";

  return user ? <Navigate to={goto} /> : children;
}
