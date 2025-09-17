import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import {
  errorNotification,
  successNotification,
} from "../Services/NotificationService";

const ApplicationForm = () => {
  const { id } = useParams();
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      github: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      email: isNotEmpty("Email is required"),
      phone: isNotEmpty("Phone is required"),
      github: isNotEmpty("Github is required"),
      resume: isNotEmpty("Resume is required"),
    },
  });

  const handleSubmit = async () => {
    setSubmit(true);
    const resume: any = await getBase64(form.getValues().resume);
    const applicant = { ...form.getValues(), resume: resume.split(",")[1] };
    applyJob(id as string, applicant)
      .then((res) => {
        setSubmit(false);
        successNotification("Success", "Applied to job successfully");
        navigate("/job-history");
      })
      .catch((err) => {
        console.log(err);
        setSubmit(false);
        errorNotification("Error", err.response.data.errorMessage);
      });
  };

  const handlePreview = () => {
    form.validate();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!form.isValid()) return;
    setPreview(!preview);
  };
  return (
    <div>
      <LoadingOverlay
        className="!fixed"
        visible={submit}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="text-xl font-semibold mb-5">Submit Your application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            label="Full Name"
            placeholder="Enter name"
            withAsterisk
            readOnly={preview}
            variant={`${preview ? "unstyled" : "default"}`}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          />
          <TextInput
            {...form.getInputProps("email")}
            label="Email"
            placeholder="Enter email"
            withAsterisk
            readOnly={preview}
            variant={`${preview ? "unstyled" : "default"}`}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            label="Phone Number"
            placeholder="Enter phone"
            withAsterisk
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
            readOnly={preview}
            variant={`${preview ? "unstyled" : "default"}`}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          />
          <TextInput
            {...form.getInputProps("github")}
            withAsterisk
            label="Github Profile"
            placeholder="Enter url"
          />
        </div>
        <FileInput
          accept="application/pdf"
          {...form.getInputProps("resume")}
          label="Attach your CV"
          placeholder="Your CV"
          leftSection={<IconPaperclip stroke={1.5} />}
          readOnly={preview}
          variant={`${preview ? "unstyled" : "default"}`}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
        />
        <Textarea
          {...form.getInputProps("coverLetter")}
          placeholder="Write something about yourself..."
          label="Cover Letter"
          autosize
          minRows={4}
          readOnly={preview}
          variant={`${preview ? "unstyled" : "default"}`}
          className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
        />
        {!preview && (
          <Button variant="light" color="brightSun.4" onClick={handlePreview}>
            Preview
          </Button>
        )}
        {preview && (
          <div className="flex gap-10 [&>*]:w-1/2">
            <Button
              variant="outlined"
              color="brightSun.4"
              onClick={handlePreview}
              fullWidth
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="brightSun.4"
              onClick={handleSubmit}
              fullWidth
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ApplicationForm;
