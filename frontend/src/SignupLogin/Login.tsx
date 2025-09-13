import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import { loginUser } from "../Services/UserService";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid) {
      loginUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Login Successful",
            message: "Redirecting to home page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "border border-green-500",
          });
          setTimeout(() => {
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          console.log(err.response.data);
          notifications.show({
            title: "Login error",
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "border border-red-500",
          });
        });
    }
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Login to your account</div>
      <TextInput
        name="email"
        value={data.email}
        onChange={handleChange}
        label="Email"
        placeholder="Your email"
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
        error={formError.email}
      />
      <PasswordInput
        name="password"
        value={data.password}
        onChange={handleChange}
        label="Password"
        placeholder="Your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
        error={formError.password}
      />
      <Button variant="filled" autoContrast onClick={handleSubmit}>
        Login
      </Button>

      <div className="mx-auto">
        Don't have an account?{" "}
        <span
          onClick={() => {
            navigate("/signup");
            setFormError(form);
            setData(form);
          }}
          className="text-bright-sun-400 hover:underline cursor-pointer"
        >
          Register
        </span>
      </div>
    </div>
  );
};
export default Login;
