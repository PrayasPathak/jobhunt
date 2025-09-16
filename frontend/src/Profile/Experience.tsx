import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [experiences, setExperiences] = useState<string[]>([]);
  const [addExp, setAddExp] = useState(false);

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setExperiences(profile.experiences);
    } else {
      setEdit(false);
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-4 flex justify-between">
        Experience
        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            color="brightSun.4"
            size="lg"
            onClick={() => setAddExp(true)}
          >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color={`${edit ? "red.8" : "brightSun.4"}`}
            size="lg"
            onClick={handleClick}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {profile?.experiences?.map((exp: any, index: number) => (
          <ExpCard key={index} {...exp} edit={edit} index={index} />
        ))}
        {addExp && <ExpInput setEdit={setAddExp} add />}
      </div>
    </div>
  );
};
export default Experience;
