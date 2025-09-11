import { companyData } from "../Data/Company";

// interface Props {
//   Name: string;
//   Overview: string;
//   Industry: string;
//   Website: string;
//   Size: string;
//   Headquarters: string;
//   Specialties: string[];
// }

const AboutCompany = () => {
  const company: { [key: string]: any } = companyData;
  return (
    <div className="flex flex-col gap-5">
      {Object.keys(company).map(
        (key, index) =>
          key != "Name" && (
            <div key={index}>
              <div className="text-xl mb-3 font-semibold">{key}</div>
              {key != "Website" && (
                <div className="text-sm text-mine-shaft-300 text-justify">
                  {key != "Specialties"
                    ? company[key]
                    : company[key].map((item: string, index: number) => (
                        <span key={index} className="flex flex-col">
                          {" "}
                          &bull; {item}
                        </span>
                      ))}
                </div>
              )}
              {key == "Website" && (
                <a
                  href={company[key]}
                  className="text-sm text-bright-sun-400 text-justify"
                  target="_blank"
                >
                  {company[key]}
                </a>
              )}
            </div>
          )
      )}
    </div>
  );
};
export default AboutCompany;
