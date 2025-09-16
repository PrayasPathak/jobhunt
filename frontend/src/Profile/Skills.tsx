import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState<string[]>([]);

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else {
      setEdit(false);
    }
  };

  const handleSave = () => {
    setEdit(false);
    const updatedProfile = { ...profile, skills };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Skills updated successfully");
  };

  return (
    <div className="p-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills{" "}
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
        <TagsInput
          splitChars={[",", "|", " "]}
          placeholder="Add Skill"
          value={skills}
          onChange={setSkills}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: any, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Skills;
