import { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import { STATUS_VALUES } from '../services/api'

const EMPTY_FIELDS = {
  company: '',
  role: '',
  status: 'Applied',
  dateApplied: dayjs().format('YYYY-MM-DD'),
  url: '',
  notes: '',
}

function validate(fields) {
  const errs = {}
  if (!fields.company.trim()) errs.company = 'Company is required'
  else if (fields.company.length > 100) errs.company = 'Max 100 characters'
  if (!fields.role.trim()) errs.role = 'Role is required'
  else if (fields.role.length > 150) errs.role = 'Max 150 characters'
  if (!STATUS_VALUES.includes(fields.status)) errs.status = 'Select a valid status'
  if (!fields.dateApplied) errs.dateApplied = 'Date is required'
  if (fields.url && !/^https?:\/\//.test(fields.url)) errs.url = 'Must start with http:// or https://'
  if (fields.notes.length > 1000) errs.notes = 'Max 1000 characters'
  return errs
}

export default function JobFormModal({ open, job, onClose, onSubmit, loading }) {
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (job) {
      setFields({
        company: job.company,
        role: job.role,
        status: job.status,
        dateApplied: job.dateApplied,
        url: job.url,
        notes: job.notes,
      })
    } else {
      setFields(EMPTY_FIELDS)
    }
    setErrors({})
  }, [job, open])

  function handleChange(field) {
    return (e) => {
      setFields(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function handleSubmit() {
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    onSubmit(fields)
  }

  const isEdit = Boolean(job)

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEdit ? 'Edit Application' : 'Add Application'}</DialogTitle>
      <DialogContent sx={{ pt: '12px !important' }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Company"
              value={fields.company}
              onChange={handleChange('company')}
              error={Boolean(errors.company)}
              helperText={errors.company}
              fullWidth
              autoFocus={!isEdit}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Role"
              value={fields.role}
              onChange={handleChange('role')}
              error={Boolean(errors.role)}
              helperText={errors.role}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              select
              label="Status"
              value={fields.status}
              onChange={handleChange('status')}
              error={Boolean(errors.status)}
              helperText={errors.status}
              fullWidth
            >
              {STATUS_VALUES.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Date Applied"
              type="date"
              value={fields.dateApplied}
              onChange={handleChange('dateApplied')}
              error={Boolean(errors.dateApplied)}
              helperText={errors.dateApplied}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Job Posting URL"
              value={fields.url}
              onChange={handleChange('url')}
              error={Boolean(errors.url)}
              helperText={errors.url || 'Optional'}
              fullWidth
              placeholder="https://"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Notes"
              value={fields.notes}
              onChange={handleChange('notes')}
              error={Boolean(errors.notes)}
              helperText={errors.notes || `${fields.notes.length}/1000`}
              fullWidth
              multiline
              rows={3}
              inputProps={{ maxLength: 1000 }}
              placeholder="Interview notes, contacts, salary info…"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button variant="text" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isEdit ? 'Save' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
