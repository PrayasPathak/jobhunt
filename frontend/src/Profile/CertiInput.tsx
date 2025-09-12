import { Button, TextInput } from "@mantine/core";
import { SelectInput } from "./SelectInput";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertiInput = (props: any) => {
  const [issueDate, setIssueDate] = useState<string | Date | null>();
  const select = fields;
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibolds">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput label="Title" withAsterisk placeholder="Enter title" />
        <SelectInput {...select[1]} />
      </div>

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          label="Issue Date"
          placeholder="Pick Date"
          value={issueDate}
          onChange={setIssueDate}
          maxDate={new Date()}
        />
        <TextInput label="Certificate ID" withAsterisk placeholder="Enter ID" />
      </div>

      <div className="flex gap-5">
        <Button
          color="brightSun.4"
          variant="outline"
          onClick={() => props.setEdit(false)}
        >
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
