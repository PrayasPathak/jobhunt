import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePassword, sendOtp, verifyOtp } from "../Services/UserService";
import { signUpValidation } from "../Services/FormValidation";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [resendLoader, setResendLoader] = useState(false);
  const [seconds, setSeconds] = useState(15);
  const interval = useInterval(() => {
    if (seconds == 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else {
      setSeconds((s) => s - 1);
    }
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        console.log(res);
        successNotification("OTP sent successfully", "Enter OTP to reset.");
        setOtpSent(true);
        setOtpSending(false);
        setResendLoader(true);
        interval.start();
      })
      .catch((err) => {
        console.log(err);
        setOtpSending(false);
        errorNotification("OTP Sending Failed", err.response.data.errorMessage);
      });
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        successNotification("OTP Verified", "Enter new password");
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "OTP Verification Failed",
          err.response.data.errorMessage
        );
      });
  };

  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.start();
  };

  const handleResetPassword = () => {
    changePassword(email, password)
      .then((res) => {
        console.log(res);
        successNotification("Password Changed", "Login with new password");
        props.close();
      })
      .catch((err) => {
        console.log(err);
        errorNotification(
          "Password Reset Failed",
          err.response.data.errorMessage
        );
      });
  };

  return (
    <Modal opened={props.opened} onClose={props.close} title="Reset Password">
      <div className="flex flex-col gap-6">
        <TextInput
          size="md"
          label="Email"
          value={email}
          name={email}
          placeholder="Your email"
          onChange={(e) => setEmail(e.target.value)}
          leftSection={<IconAt size={16} />}
          withAsterisk
          rightSection={
            <Button
              variant="filled"
              onClick={handleSendOtp}
              autoContrast
              size="xs"
              className="mr-1"
              disabled={email === "" || otpSent}
              loading={otpSending && !otpSent}
            >
              Send Otp
            </Button>
          }
          rightSectionWidth="xl"
        />
        {otpSent && (
          <PinInput
            type="number"
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            onComplete={handleVerifyOtp}
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-3">
            <Button
              variant="light"
              onClick={resendOtp}
              autoContrast
              loading={otpSending}
              color="brightSun.4"
              fullWidth
            >
              {resendLoader ? seconds : "Resend"}
            </Button>

            <Button
              variant="filled"
              onClick={changeEmail}
              autoContrast
              loading={otpSending}
              fullWidth
            >
              Change Email
            </Button>
          </div>
        )}

        {verified && (
          <PasswordInput
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(signUpValidation("password", e.target.value));
            }}
            label="Password"
            placeholder="Your password"
            leftSection={
              <IconLock style={{ width: rem(16), height: rem(16) }} />
            }
            withAsterisk
            error={passwordError}
          />
        )}

        {verified && (
          <Button onClick={handleResetPassword} autoContrast variant="filled">
            Change Password
          </Button>
        )}
      </div>
    </Modal>
  );
};
export default ResetPassword;
