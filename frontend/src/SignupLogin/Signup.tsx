import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>
      <TextInput label="Full Name" placeholder="Your name" withAsterisk />
      <TextInput
        label="Email"
        placeholder="Your email"
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Re enter your password"
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        withAsterisk
      />
      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms & conditions</Anchor>
          </>
        }
      />
      <Button variant="filled" autoContrast>
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
