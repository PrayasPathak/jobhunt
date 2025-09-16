import { ActionIcon } from "@mantine/core";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certification = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const [addCerti, setAddCerti] = useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
    <div className="p-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Certifications
        <div className="flex gap-2">
          <ActionIcon variant="subtle" color="brightSun.4" size="lg">
            <IconPlus
              className="h-4/5 w-4/5"
              onClick={() => setAddCerti(true)}
            />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color={`${edit ? "red.8" : "brightSun.4"}`}
            onClick={handleClick}
            size="lg"
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {profile?.certifications?.map((cert: any, index: number) => (
          <CertiCard key={index} {...cert} edit={edit} index={index} />
        ))}
        {addCerti && <CertiInput setEdit={setAddCerti} add />}
      </div>
    </div>
  );
};
export default Certification;
