import {
  Button,
  Divider,
  FileInput,
  LoadingOverlay,
  Notification,
  NumberInput,
  rem,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [second, setSecond] = useState(5);
  const naviage = useNavigate();

  const handleSubmit = () => {
    setSubmit(true);
    let x = 5;
    setInterval(() => {
      x--;
      setSecond(x);
      if (x == 0) naviage("/find-jobs");
    }, 1000);
  };

  const handlePreview = () => {
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-2/3 mx-auto">
        <LoadingOverlay
          className="!fixed"
          visible={submit}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "brightSun.4", type: "bars" }}
        />
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img src={`/icons/Google.png`} alt="Meta" className="h-14" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl">
                Software Engineer III
              </div>
              <div className="text-lg text-mine-shaft-300">
                Google &#x2022; 3 days ago &bull; 48 Applicants
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        {/*  */}
        <div className="text-xl font-semibold mb-5">
          Submit Your application
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput
              label="Full Name"
              placeholder="Enter name"
              withAsterisk
              readOnly={preview}
              variant={`${preview ? "unstyled" : "default"}`}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              withAsterisk
              readOnly={preview}
              variant={`${preview ? "unstyled" : "default"}`}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
            />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <NumberInput
              label="Phone Number"
              placeholder="Enter phone"
              withAsterisk
              hideControls
              min={0}
              max={9999999999}
              clampBehavior="strict"
              readOnly={preview}
              variant={`${preview ? "unstyled" : "default"}`}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
            />
            <TextInput label="Personal Website" placeholder="Enter url" />
          </div>
          <FileInput
            label="Attach your CV"
            placeholder="Your CV"
            leftSection={<IconPaperclip stroke={1.5} />}
            readOnly={preview}
            variant={`${preview ? "unstyled" : "default"}`}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
          />
          <Textarea
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
      <Notification
        icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
        color="teal"
        title="Application Submitted"
        mt="md"
        withCloseButton={false}
        withBorder
        className={`border border-bright-sun-500 !fixed top-0 left-[35%] transition duration-300 ease-in-out z-[1001]
          ${submit ? "translate-y-0" : "-translate-y-20"}`}
      >
        You will be redirected to Find Jobs in {second} seconds...
      </Notification>
    </>
  );
};
export default ApplyJob;
