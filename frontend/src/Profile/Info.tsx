import { useState } from "react";
import { ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
} from "@tabler/icons-react";
import { SelectInput } from "./SelectInput";
import fields from "../Data/Profile";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      location: "",
    },
  });

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
      });
    } else {
      setEdit(!edit);
      const updatedProfile = { ...profile, ...form.getValues() };
      dispatch(changeProfile(updatedProfile));
      successNotification("Success", "Profile updated successfully");
    }
  };
  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <ActionIcon variant="subtle" color="brightSun.4" size="lg">
          {edit ? (
            <IconDeviceFloppy className="h-4/5 w-4/5" onClick={handleClick} />
          ) : (
            <IconPencil className="h-4/5 w-4/5" onClick={handleClick} />
          )}
        </ActionIcon>
      </div>
      {edit ? (
        <>
          <div className="flex gap-10 [&>*]:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <SelectInput form={form} name="location" {...select[2]} />
        </>
      ) : (
        <>
          <span className="text-lg flex gap-1 items-center">
            <IconBriefcase className="h-5 w-5" stroke={1.5} />
            {profile.role} &bull; {profile.company}
          </span>
          <span className="flex gap-1 items-center text-xs text-mine-shaft-300">
            <IconMapPin className="h-5 w-5" stroke={1.5} /> {profile.location}
          </span>
        </>
      )}
    </>
  );
};
export default Info;
