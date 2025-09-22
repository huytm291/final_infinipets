const PlaceholderImage = ({ width = 120, height = 40, alt = 'Placeholder' }) => (
  <svg width={width} height={height} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="120" height="40" fill="#f0f0f0" />
    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#999" fontSize="12">
      {alt}
    </text>
  </svg>
);

export default PlaceholderImage;