import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

const About = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, about };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "About updated successfully");
  };

  return (
    <div className="p-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About{" "}
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
        <Textarea
          autosize
          minRows={3}
          placeholder="Enter about yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      )}
    </div>
  );
};
export default About;
