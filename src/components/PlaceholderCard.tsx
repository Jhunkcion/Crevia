type PlaceholderCardProps = {
  number?: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
};

function PlaceholderCard({
  number = "01",
  title,
  subtitle = "CRIVEA",
  onClick,
}: PlaceholderCardProps) {
  return (
    <button
      className="placeholder-card"
      onClick={onClick}
      type="button"
    >
      <div className="placeholder-card__top">
        <span>{number}</span>
        <span>{subtitle}</span>
      </div>

      <div className="placeholder-card__center">
        <span>{title.charAt(0)}</span>
      </div>

      <div className="placeholder-card__bottom">
        <h3>{title}</h3>
        <span>↗</span>
      </div>
    </button>
  );
}

export default PlaceholderCard;