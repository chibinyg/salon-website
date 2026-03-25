import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import AddIcon from '@mui/icons-material/Add'

export default function EmptyState({ onAddClick }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        gap: 2,
      }}
    >
      <BusinessCenterOutlinedIcon sx={{ fontSize: 64, color: '#c7c7cc' }} />
      <Typography variant="h6" color="text.primary">
        No applications yet
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', maxWidth: 340 }}>
        Start tracking your job search by adding your first application.
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
        sx={{ mt: 1 }}
      >
        Add Application
      </Button>
    </Box>
  )
}
