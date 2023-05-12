import { useNavigate } from "react-router-dom";

export const errorNavigateRedirect = () => {
  const navigate = useNavigate();

  return {
    dataErrorRedirect: () => navigate("/error"),
  };
};
