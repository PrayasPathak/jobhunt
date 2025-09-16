import { Button, TextInput } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import fields from "../Data/Profile";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { SelectInput } from "./SelectInput";

const CertiInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Title is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue Date is required"),
      certificateId: isNotEmpty("Certificate id is requierd"),
    },
    validateInputOnChange: true,
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    const certi = [...profile.certifications];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate =
      certi[certi.length - 1].issueDate?.toISOString();
    const updatedProfile = { ...profile, certifications: certi };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certifications Added Successfully");
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibolds">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          label="Title"
          withAsterisk
          placeholder="Enter title"
          {...form.getInputProps("name")}
        />
        <SelectInput {...select[1]} form={form} name="issuer" />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          label="Issue Date"
          placeholder="Pick Date"
          maxDate={new Date()}
        />
        <TextInput
          label="Certificate ID"
          withAsterisk
          placeholder="Enter ID"
          {...form.getInputProps("certificateId")}
        />
      </div>

      <div className="flex gap-5">
        <Button color="green.8" variant="outline" onClick={handleSave}>
          Save
        </Button>
        <Button
          color="red.8"
          variant="light"
          onClick={() => props.setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
export default CertiInput;
