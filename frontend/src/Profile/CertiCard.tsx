import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

interface Props {
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
  edit?: boolean;
  index: number;
}
const CertiCard = ({
  name,
  issuer,
  issueDate,
  certificateId,
  edit,
  index,
}: Props) => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const certi = [...profile.certifications];
    certi.splice(index, 1);
    const updatedProfile = { ...profile, certifications: certi };
    dispatch(changeProfile(updatedProfile));
    successNotification("Succcess", "Certification Deleted Successfully");
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img src={`/icons/${issuer}.png`} alt="Meta" className="h-7" />
        </div>
        <div className="flex flex-col">
          <div>{name}</div>
          <div className="text-sm text-mine-shaft-300 font-semibold">
            {issuer}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-end">
          <div className="text-sm text-mine-shaft-300">
            {formatDate(issueDate)}
          </div>
          <div className="text-sm text-mine-shaft-300">{certificateId}</div>
        </div>
        {edit && (
          <ActionIcon color="red.8" variant="light" onClick={handleDelete}>
            <IconTrash className="h-4/5 w-4/5" stroke={1.5} />
          </ActionIcon>
        )}
      </div>
    </div>
  );
};
export default CertiCard;
