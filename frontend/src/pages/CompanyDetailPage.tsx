import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CompanyProfile from "../CompanyProfile/CompanyProfile";
import SimilarCompanies from "../CompanyProfile/SimilarCompanies";

const CompanyDetailPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90hv] bg-mine-shaft-950 font-['Poppins'] p-4">
      <Button
        onClick={() => navigate(-1)}
        color="brightSun.4"
        variant="light"
        leftSection={<IconArrowLeft />}
        my="md"
      >
        Back
      </Button>
      <div className="flex gap-5 justify-between">
        <CompanyProfile />
        <SimilarCompanies />
      </div>
    </div>
  );
};
export default CompanyDetailPage;
