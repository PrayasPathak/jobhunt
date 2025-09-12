import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../Services/UserService";
import { signUpValidation } from "../Services/FormValidation";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const Signup = () => {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);

  const handleChange = (event) => {
    if (typeof event == "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name;
    let value = event.target.value;

    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: signUpValidation(name, value) });
    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (data.confirmPassword !== value) err = "Passwords do not match";
      setFormError({
        ...formError,
        [name]: signUpValidation(name, value),
        confirmPassword: err,
      });
    }
    if (name === "confirmPassword") {
      if (data.password !== value)
        setFormError({ ...formError, [name]: "Passwords do not match" });
      else
        setFormError({
          ...formError,
          confirmPassword: "",
        });
    }
  };

  const handleSubmit = () => {
    let valid = true,
      newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = signUpValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    if (valid)
      registerUser(data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err.response.data));
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput
        label="Full Name"
        placeholder="Your name"
        withAsterisk
        name="name"
        value={data.name}
        onChange={handleChange}
        error={formError.name}
      />
      <TextInput
        label="Email"
        placeholder="Your email"
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
        name="email"
        value={data.email}
        onChange={handleChange}
        error={formError.email}
      />
      <PasswordInput
        name="password"
        value={data.password}
        label="Password"
        placeholder="Your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
        onChange={handleChange}
        error={formError.password}
      />
      <PasswordInput
        name="confirmPassword"
        value={data.confirmPassword}
        label="Confirm Password"
        placeholder="Re enter your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
        onChange={handleChange}
        error={formError.confirmPassword}
      />
      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are? "
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            value="APPLICANT"
            label="Applicant"
            autoContrast
            className="px-6 py-4 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5"
          />
          <Radio
            value="EMPLOYER"
            label="Employer"
            autoContrast
            className="px-6 py-4 border border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 hover:bg-mine-shaft-900 has-[:checked]:bg-bright-sun-400/5"
          />
        </Group>
      </Radio.Group>
      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & conditions</Anchor>
          </>
        }
      />
      <Button variant="filled" autoContrast onClick={handleSubmit}>
        Sign up
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};
export default Signup;
