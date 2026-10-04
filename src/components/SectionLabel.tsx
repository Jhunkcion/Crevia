type SectionLabelProps = {
  number: string;
  children: React.ReactNode;
};

function SectionLabel({
  number,
  children,
}: SectionLabelProps) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

export default SectionLabel;