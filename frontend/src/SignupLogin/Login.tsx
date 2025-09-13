import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { loginUser } from "../Services/UserService";
import { setUser } from "../Slices/UsersSlice";
import ResetPassword from "./ResetPassword";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormError({ ...formError, [event.target.name]: "" });
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    setLoading(true);
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
          successNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          setTimeout(() => {
            setLoading(false);
            dispatch(setUser(res));
            navigate("/");
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data);
          errorNotification("Login failed", err.response.data.errorMessage);
        });
    }
  };

  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
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
        <Button
          variant="filled"
          autoContrast
          onClick={handleSubmit}
          loading={loading}
        >
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
        <div
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
          onClick={open}
        >
          Forgot Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};
export default Login;
