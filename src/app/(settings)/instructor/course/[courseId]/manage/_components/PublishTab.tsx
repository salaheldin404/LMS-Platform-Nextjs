
const PublishTab = ({ courseStatus }: { courseStatus?: string }) => {
  console.log("courseStatus", courseStatus);
  return <div className="p-4">
    <h1 className="text-2xl font-semibold">Publish Course</h1>
    <p className="text-sm text-muted-foreground">
      You can publish your course here.
    </p>
    <div className="flex flex-col gap-4 mt-4">
      {courseStatus === "published" ? (
        <p className="text-sm text-muted-foreground">
          Your course is already published.
        </p>
      ) : (
        <p className="text-sm text-muted-foreground">
          Your course is not published yet.
        </p>
      )}
    </div>
  </div>;
};

export default PublishTab
