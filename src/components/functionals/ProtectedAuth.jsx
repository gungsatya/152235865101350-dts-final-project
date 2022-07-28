import { useAuthState } from "react-firebase-hooks/auth";
import {
  useLocation,
  useSearchParams,
  createSearchParams,
  Navigate,
} from "react-router-dom";
import { auth } from "../../authentication/firebase.js";

export default function ProtectedAuth({ children }) {
  const [user] = useAuthState(auth);
  const location = useLocation();

  const [queryStrings] = useSearchParams();

  return user ? (
    children
  ) : (
    <Navigate
      to={`/login?${createSearchParams({
        ...queryStrings,
        goto: location.pathname,
      })}`}
    />
  );
}
