import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import SectionWrapper from "./SectionWrapper";

const LearnSection = ({ willLearn }: { willLearn: string[] }) => {
  return (
    <SectionWrapper title="What you'll learn">
      <div className="grid md:grid-cols-2 gap-3">
        {willLearn?.map((item, index) => (
          <div key={index} className="flex gap-2">
            <span className="text-green-600 mt-1 flex-shrink-0">
              <FiCheckCircle className="h-5 w-5" />
            </span>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default LearnSection;
