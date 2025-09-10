interface Props {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ExpCard = ({
  title,
  company,
  location,
  startDate,
  endDate,
  description,
}: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/icons/${company}.png`} alt={company} className="h-7" />
          </div>
          <div className="flex flex-col">
            <div>{title}</div>
            <div className="text-sm text-mine-shaft-300 font-semibold">
              {company} &bull; {location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {startDate} - {endDate}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {description}
      </div>
    </div>
  );
};
export default ExpCard;
