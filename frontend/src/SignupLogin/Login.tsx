import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../Services/UserService";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState(form);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    loginUser(data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response.data));
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
      />
      <PasswordInput
        name="password"
        value={data.password}
        onChange={handleChange}
        label="Password"
        placeholder="Your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
      />
      <Button variant="filled" autoContrast onClick={handleSubmit}>
        Login
      </Button>

      <div className="mx-auto">
        Don't have an account?{" "}
        <Link to="/signup" className="text-bright-sun-400 hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};
export default Login;
