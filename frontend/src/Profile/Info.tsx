import { ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconBriefcase,
  IconCheck,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import fields from "../Data/Profile";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { SelectInput } from "./SelectInput";

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
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Info updated successfully");
  };

  return (
    <>
      <div className="text-3xl font-semibold flex justify-between">
        {user.name}
        <div>
          {edit && (
            <ActionIcon variant="subtle" color="green.8" size="lg">
              <IconCheck className="h-4/5 w-4/5" onClick={handleSave} />
            </ActionIcon>
          )}
          <ActionIcon
            variant="subtle"
            color={`${edit ? "red.8" : "brightSun.4"}`}
            size="lg"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" onClick={handleClick} />
            ) : (
              <IconPencil className="h-4/5 w-4/5" onClick={handleClick} />
            )}
          </ActionIcon>
        </div>
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
