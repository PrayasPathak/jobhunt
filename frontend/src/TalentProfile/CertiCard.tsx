interface Props {
  name: string;
  issuer: string;
  issueDate: string;
  certificateId: string;
}
const CertiCard = ({ name, issuer, issueDate, certificateId }: Props) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2 items-center">
        <div className="p-2 bg-mine-shaft-800 rounded-md">
          <img src={`/icons/${issuer}.png`} alt="Meta" className="h-7" />
        </div>
        <div className="flex flex-col">
          <div>{name}</div>
          <div className="text-sm text-mine-shaft-300 font-semibold">
            {issuer}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-sm text-mine-shaft-300">{issueDate}</div>
        <div className="text-sm text-mine-shaft-300">{certificateId}</div>
      </div>
    </div>
  );
};
export default CertiCard;
