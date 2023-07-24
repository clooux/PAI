import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";
import jwtDecode from "jwt-decode";
import LoginCard from "../components/LoginCard";
import RegisterCard from "../components/RegisterCard";
import { SignInUser, SignUpUser, User } from "../models/User";
import { ApiURL } from '../api/api';

const loginUser = async (user: SignInUser) => {
  const response = await fetch(ApiURL + "auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  return data;
};

const registerUser = async (user: SignUpUser) => {
  const response = await fetch(ApiURL + "auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  return data;
};

function LoginPage() {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const { mutate: loginMutation } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      const decodedToken: User = jwtDecode(data.accessToken);
      setUser(decodedToken);
      navigate("/books");
    },
  });

  const { mutate: registerMutation } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      const decodedToken: User = jwtDecode(data.accessToken);
      setUser(decodedToken);
      navigate("/user");
    },
  });

  const signIn = (data: SignInUser) => {
    loginMutation(data);
  };

  const signUp = (data: SignUpUser) => {
    registerMutation(data);
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-base-200 pt-10">
      <div className="hero-content text-center align-top flex-col">
        <h1 className="text-5xl font-bold">Welcome to reserveBook!</h1>
        <h3 className="text-2xl font-bold">Choose to sign in or sign up</h3>
        <div className="flex flex-row mt-12">
          <div className="pr-44 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-5">Sign in</h2>
            <LoginCard signIn={signIn} />
          </div>

          <div className="divider divider-horizontal">OR</div>

          <div className="pl-44">
            <h2 className="text-2xl font-bold mb-5">Sign up</h2>
            <RegisterCard signUp={signUp} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
