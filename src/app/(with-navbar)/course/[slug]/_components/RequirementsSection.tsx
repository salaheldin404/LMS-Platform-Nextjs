import { FaCircle } from "react-icons/fa";
import SectionWrapper from "./SectionWrapper";

const RequirementsSection = ({ requirements }: { requirements: string[] }) => {
  return (
    <SectionWrapper title={"Requirements"}>
      <ul className="space-y-2">
        {requirements.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-slate-400 mt-1">
              <FaCircle className="h-2 w-2" />
            </span>
            <p>{item}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default RequirementsSection;
