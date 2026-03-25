import Chip from '@mui/material/Chip'

const STATUS_COLORS = {
  'Applied':        { bg: '#e8f4fd', color: '#0077b6' },
  'Phone Screen':   { bg: '#fff8e6', color: '#b07d00' },
  'Interviewing':   { bg: '#e8f5e9', color: '#2e7d32' },
  'Offer Received': { bg: '#f3e5f5', color: '#6a1b9a' },
  'Rejected':       { bg: '#fce4ec', color: '#b71c1c' },
  'Withdrawn':      { bg: '#f5f5f5', color: '#6e6e73' },
}

export default function StatusChip({ status }) {
  const colors = STATUS_COLORS[status] ?? { bg: '#f5f5f5', color: '#6e6e73' }
  return (
    <Chip
      label={status}
      sx={{
        backgroundColor: colors.bg,
        color: colors.color,
        fontWeight: 500,
        fontSize: '12px',
        height: '24px',
        borderRadius: '6px',
      }}
    />
  )
}
