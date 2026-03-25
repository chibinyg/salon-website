import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

export default function Header({ onAddClick }) {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, sm: 3 } }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: 'text.primary' }}>
          Job Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddClick}
          size="small"
          sx={{ fontSize: '13px', padding: '5px 14px' }}
        >
          Add Application
        </Button>
      </Toolbar>
    </AppBar>
  )
}
