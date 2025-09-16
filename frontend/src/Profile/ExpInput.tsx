import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import fields from "../Data/Profile";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { SelectInput } from "./SelectInput";

const ExpInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSave = () => {
    form.validate();
    const values = form.getValues();
    if (!form.isValid()) return;

    const startDate =
      values.startDate instanceof Date
        ? values.startDate.toISOString()
        : new Date(values.startDate).toISOString();

    const endDate =
      values.working || !values.endDate
        ? null
        : values.endDate instanceof Date
        ? values.endDate.toISOString()
        : new Date(values.endDate).toISOString();

    const formattedExp = {
      ...values,
      startDate,
      endDate,
    };

    const exp = [...profile.experiences];

    if (props.add) {
      exp.push(formattedExp);
    } else {
      exp[props.index] = formattedExp;
    }

    const updatedProfile = { ...profile, experiences: exp };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification(
      "Success",
      `Experiences ${props.add ? "Added" : "Updated"} Successfully`
    );
  };

  useEffect(() => {
    if (!props.add) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
    }
  }, []);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      description: isNotEmpty("Description is required"),
      location: isNotEmpty("Location is required"),
    },
    validateInputOnChange: true,
  });

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} form={form} name="title" />
        <SelectInput {...select[1]} form={form} name="company" />
      </div>
      <SelectInput {...select[2]} form={form} name="location" />
      <Textarea
        {...form.getInputProps("description")}
        withAsterisk
        label="Summary"
        autosize
        minRows={3}
        placeholder="Enter summary"
      />

      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          withAsterisk
          label="Start Date"
          placeholder="Pick Date"
          maxDate={form.getValues().endDate || undefined}
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          withAsterisk
          label="End Date"
          placeholder="Pick Date"
          maxDate={new Date()}
          minDate={form.getValues().startDate || undefined}
          disabled={form.getValues().working}
        />
      </div>
      <Checkbox
        checked={form.getValues().working}
        onChange={(e) => {
          const isChecked = e.currentTarget.checked;
          form.setFieldValue("working", isChecked);
          if (!isChecked && !form.getValues().endDate) {
            form.setFieldValue("endDate", new Date());
          }
        }}
        label="Currently Working here"
      />
      <div className="flex gap-5">
        <Button color="green.8" variant="light" onClick={handleSave}>
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
export default ExpInput;
