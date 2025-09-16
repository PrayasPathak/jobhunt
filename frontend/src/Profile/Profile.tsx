import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";

import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import About from "./About";
import Certification from "./Certification";
import Experience from "./Experience";
import Info from "./Info";
import Skills from "./Skills";

const Profile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const { hovered, ref } = useHover();

  const handleFileChange = async (image: any) => {
    const picture: any = await getBase64(image);
    const updatedProfile = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile picture updated successfully");
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="w-4/5 mx-auto">
      {/* Left */}
      <div className="">
        <div className="relative">
          <img
            src="/profile/banner.jpg"
            alt="Banner"
            className="rounded-t-2xl"
          />
          <div
            className="absolute -bottom-1/3 left-3 flex items-center justify-center"
            ref={ref}
          >
            <Avatar
              src={
                profile.picture
                  ? `data:image/jpeg;base64, ${profile.picture}`
                  : "/avatar.png"
              }
              alt="Avatar"
              className="rounded-full !h-48 !w-48 border-8 border-mine-shaft-950"
            />
            {hovered && (
              <Overlay
                color="#000"
                backgroundOpacity={0.75}
                className="!rounded-full cursor-pointer"
              />
            )}

            {hovered && (
              <IconEdit className="absolute z-[300] cursor-pointer w-16 h-16" />
            )}

            {hovered && (
              <FileInput
                className="absolute w-full h-full z-[301] [&_*]:!h-full [&_*]:!rounded-full"
                accept="image/png,image/jpeg"
                variant="transparent"
                onChange={handleFileChange}
              />
            )}
          </div>
        </div>
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
