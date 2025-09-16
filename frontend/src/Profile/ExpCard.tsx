import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formatDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

interface Props {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  edit: boolean;
  working: boolean;
  index: number;
}

const ExpCard = (props: Props) => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const exp = [...profile.experiences];
    exp.splice(props.index, 1);
    const updatedProfile = { ...profile, experiences: exp };
    dispatch(changeProfile(updatedProfile));
    successNotification("Succcess", "Experience Deleted Successfully");
  };

  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img
              src={`/icons/${props.company}.png`}
              alt={props.company}
              className="h-7"
            />
          </div>
          <div className="flex flex-col">
            <div>{props.title}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {formatDate(props.startDate)} -{" "}
          {props.working ? "Present" : formatDate(props.endDate)}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-5">
          <Button
            color="brightSun.4"
            variant="outline"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button color="red.8" variant="light" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput setEdit={setEdit} {...props} />
  );
};
export default ExpCard;
