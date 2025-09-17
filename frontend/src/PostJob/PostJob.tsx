import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import { SelectInput } from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { postJob } from "../Services/JobService";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const select = fields;
  const navigate = useNavigate();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Job Title is required"),
      company: isNotEmpty("Company is required"),
      experience: isNotEmpty("Experience is required"),
      jobType: isNotEmpty("Job Type is required"),
      location: isNotEmpty("Location is required"),
      packageOffered: isNotEmpty("Package Offered is required"),
      skillsRequired: isNotEmpty("Skills is required"),
      about: isNotEmpty("About is required"),
      description: isNotEmpty("Description is required"),
    },
    validateInputOnChange: true,
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;
    postJob(form.getValues())
      .then((res) => {
        successNotification("Success", "Job Posted Successfully");
        navigate("/posted-jobs");
      })
      .catch((err) => {
        console.log(err);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post a Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:!w-1/2">
          <SelectInput {...select[0]} form={form} name="jobTitle" />
          <SelectInput {...select[1]} form={form} name="company" />
        </div>
        <div className="flex gap-10 [&>*]:!w-1/2">
          <SelectInput {...select[2]} form={form} name="experience" />
          <SelectInput {...select[3]} form={form} name="jobType" />
        </div>
        <div className="flex gap-10 [&>*]:!w-1/2">
          <SelectInput {...select[4]} form={form} name="location" />
          <NumberInput
            {...form.getInputProps("packageOffered")}
            label="Salary"
            placeholder="Enter salary in (LPA)"
            hideControls
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
          />
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          placeholder="Enter skill"
          clearable
          acceptValueOnBlur
          splitChars={[",", " ", "|"]}
        />
        <Textarea
          {...form.getInputProps("about")}
          withAsterisk
          label="About Job"
          autosize
          minRows={3}
          placeholder="Enter about job..."
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/20">
          <div className="text-sm font-medium">
            Job Description <span className="text-red-500">*</span>
          </div>
          <TextEditor form={form} />
        </div>
        <div className="flex gap-4">
          <Button variant="light" color="brightSun.4" onClick={handlePost}>
            Publish Job
          </Button>
          <Button variant="outline" color="brightSun.4">
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PostJob;
