import LoginForm from "@/components/LoginForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/", { replace: true });
    }
  }
  , []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default Login;
