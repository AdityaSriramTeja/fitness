import React from "react";

export const DetailChips = ({ label }: { label: string }) => {
  return (
    <div className="border-2 rounded-full px-4 text-sm w-fit capitalize">
      {" "}
      {label}{" "}
    </div>
  );
};
