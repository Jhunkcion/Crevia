declare const TeamSection: (props?: {
  division?: "studio" | "tech";
  selectedId?: number | null;
  onSelectId?: (id: number | null) => void;
}) => JSX.Element;
export default TeamSection;
