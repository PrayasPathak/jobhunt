import { Button, Checkbox, Textarea } from "@mantine/core";
import { useState } from "react";
import fields from "../Data/Profile";
import { SelectInput } from "./SelectInput";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
  const select = fields;
  const [description, setDescription] = useState(
    "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
  );
  const [startDate, setStartDate] = useState<string | null | Date>(null);
  const [endDate, setEndDate] = useState<string | null | Date>(new Date());
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        withAsterisk
        label="Summary"
        autosize
        minRows={3}
        placeholder="Enter summary"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          withAsterisk
          label="Start Date"
          placeholder="Pick Date"
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate || undefined}
        />
        <MonthPickerInput
          withAsterisk
          label="End Date"
          placeholder="Pick Date"
          value={endDate}
          onChange={setEndDate}
          maxDate={new Date()}
          minDate={startDate || undefined}
          disabled={checked}
        />
      </div>
      <Checkbox
        label="Currently Working here"
        checked={checked}
        onChange={(e) => setChecked(e.currentTarget.checked)}
      />
      <div className="flex gap-5">
        <Button
          color="brightSun.4"
          variant="outline"
          onClick={() => props.setEdit(false)}
        >
          Edit
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
export default ExpInput;
