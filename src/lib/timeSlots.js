/** Clinic consultation slots (1-hour ranges). */
export const TIME_SLOTS = [
  '10-11 AM',
  '11-12 PM',
  '12-1 PM',
  '1-2 PM',
  '4-5 PM',
  '5-6 PM',
  '6-7 PM',
  '7-8 PM',
]

/** Map older point-in-time labels to current range labels. */
const LEGACY_SLOT_MAP = {
  '10 AM': '10-11 AM',
  '11 AM': '11-12 PM',
  '12 PM': '12-1 PM',
  '1 PM': '1-2 PM',
  '4 PM': '4-5 PM',
  '5 PM': '5-6 PM',
  '6 PM': '6-7 PM',
  '7 PM': '7-8 PM',
}

export function normalizeSlot(slot) {
  if (!slot) return ''
  return LEGACY_SLOT_MAP[slot] || slot
}

export function todayISODate() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
