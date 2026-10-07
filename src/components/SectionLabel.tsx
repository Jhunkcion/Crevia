import type { ReactNode } from "react";

type SectionLabelProps = {
  number: string;
  children: ReactNode;
};

function SectionLabel({
  number,
  children,
}: SectionLabelProps) {
  return (
    <div className="flex w-full justify-between border-b border-blue/20 pb-[15px] text-[9px] font-bold tracking-[.13em]">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;