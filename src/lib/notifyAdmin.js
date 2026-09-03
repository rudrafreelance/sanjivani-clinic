const ADMIN_PHONE = import.meta.env.VITE_CLINIC_PHONE || '917990131841'

export function notifyAdminWhatsApp(type, data) {
  let text = ''

  if (type === 'appointment') {
    text = [
      '*New Appointment Request*',
      '',
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      data.condition && `Condition: ${data.condition}`,
      data.preferred_date && `Date: ${data.preferred_date}`,
      data.preferred_time && `Time: ${data.preferred_time}`,
      data.message && `Note: ${data.message}`,
    ].filter(Boolean).join('\n')
  } else if (type === 'contact') {
    text = [
      '*New Contact Message*',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Message: ${data.message}`,
    ].filter(Boolean).join('\n')
  }

  const phone = String(ADMIN_PHONE).replace(/\D/g, '')
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank')
}
