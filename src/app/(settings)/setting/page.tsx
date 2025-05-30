import BasicInformationForm from "./_components/BasicInformationForm";
import PasswordForm from "./_components/PasswordForm";
import SocialLinksForm from "./_components/SocialLinksForm";

const SettingPage = () => {
  return (
    <div className="">
      {/* <Suspense fallback={<p>loading..</p>}>
        // <BasicInformationForm />
      </Suspense> */}
      <BasicInformationForm />
      <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4">
        <SocialLinksForm />

        <PasswordForm />
      </div>
    </div>
  );
};

export default SettingPage;
