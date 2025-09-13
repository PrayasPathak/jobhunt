import { IconAnchor, IconArrowLeft } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Signup from "../SignupLogin/Signup";
import Login from "../SignupLogin/Login";
import { Button } from "@mantine/core";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['Poppins'] p-4 overflow-hidden relative">
      <Button
        onClick={() => navigate("/")}
        color="brightSun.4"
        variant="light"
        leftSection={<IconArrowLeft />}
        my="md"
        className="!absolute left-5 z-10"
      >
        Home
      </Button>
      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:flex-shrink-0 transition-all ease-in-out duration-1000 ${
          location.pathname === "/signup" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full bg-mine-shaft-900 flex flex-col items-center justify-center gap-5 transition-all ease-in-out duration-1000
             ${
               location.pathname == "/signup"
                 ? "rounded-r-[200px]"
                 : "rounded-l-[200px]"
             }`}
        >
          <div className="flex gap-1 items-center text-bright-sun-400">
            <IconAnchor className="h-16 w-16" stroke={2.5} />
            <Link to="/" className="text-6xl font-semibold">
              JobHook
            </Link>
          </div>
          <div className="text-2xl text-mine-shaft-200 font-semibold">
            Find the joob you need
          </div>
        </div>
        <Signup />
      </div>
    </div>
  );
};
export default SignupPage;
