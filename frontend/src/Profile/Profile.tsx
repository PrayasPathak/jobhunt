import { Divider } from "@mantine/core";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Certification from "./Certification";
import Experience from "./Experience";
import Info from "./Info";
import Skills from "./Skills";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(profile);
    getProfile(user.profileId)
      .then((data) => {
        dispatch(setProfile(data));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      {/* Left */}
      <div className="relative">
        <img src="/profile/banner.jpg" alt="Banner" className="rounded-t-2xl" />
        <img
          src="/avatar.png"
          alt="Avatar"
          className="rounded-full h-48 w-48  absolute -bottom-1/3 left-3 border-8 border-mine-shaft-950"
        />
      </div>
      {/* Info Section */}
      <div className="px-3 mt-20">
        <Info />
      </div>
      {/* About Section*/}
      <Divider my="xl" mx="xs" />
      <About />

      {/* Skills */}
      <Divider my="xl" mx="xs" />
      <Skills />
      <Divider my="xl" mx="xs" />
      <Experience />
      <Divider my="xl" mx="xs" />
      <Certification />
    </div>
  );
};
export default Profile;
