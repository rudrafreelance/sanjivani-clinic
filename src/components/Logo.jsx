export default function Logo({ size = 48, className = '' }) {
  const dim = typeof size === 'number' ? `${size}px` : size

  return (
    <img
      src="/logo.jpg"
      alt="Sanjivani Clinic"
      className={`inline-block shrink-0 rounded-full object-cover bg-white ${className}`}
      style={{ width: dim, height: dim }}
    />
  )
}
