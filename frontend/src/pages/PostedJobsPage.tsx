import PostedJobDescription from "../PostedJobs/PostedJobDescription";
import PostedJobs from "../PostedJobs/PostedJobs";

const PostedJobsPage = () => {
  return (
    <div className="min-h-[90hv] bg-mine-shaft-950 font-['Poppins'] px-4">
      <div className="flex gap-5">
        <PostedJobs />
        <PostedJobDescription />
      </div>
    </div>
  );
};
export default PostedJobsPage;
