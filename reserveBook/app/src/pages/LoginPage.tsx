import { useMutation } from "@tanstack/react-query";
import { URL } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/UserStore";
import jwtDecode from "jwt-decode";

const loginUser = async (user: LoginUser) => {
  const response = await fetch(URL + "auth/login", {
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
  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);
      const decodedToken: User = jwtDecode(data.accessToken);
      setUser(decodedToken);
      navigate("/books");
    },
  });

  const login = () => {
    mutate({ email: "walka.adam@gmail.com", password: "password" });
  };
  return (
    <div>
      <h1 className="">UserPage</h1>
      {/* <div className="tabs">
        <a className="tab tab-lifted">Tab 1</a>
        <a className="tab tab-lifted tab-active">Tab 2</a>
        <a className="tab tab-lifted">Tab 3</a>
      </div> */}
      <button onClick={() => login()}>Login</button>
    </div>
  );
}

export default LoginPage;
