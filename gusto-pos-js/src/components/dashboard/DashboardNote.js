import { useLocalization } from '@/context/LocalizationProvider';
import { Button, Card, CardContent, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
export function DashboardNote() {
  const { translate } = useLocalization();

  // State for the current note and saved notes
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);

  // Handle saving the note
  const handleSave = () => {
    if (note.trim()) {
      // Only save if note is not empty
      setSavedNotes((prevNotes) => [...prevNotes, note]); // Add the note to saved notes
      setNote(''); // Clear the input field
    }
  };

  return (
    <Paper sx={{ p: 3, flex: 1, height: 'fit-content' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>{translate('note')}</Typography>
        <Button variant="contained" disabled={true}>
          {translate('saved')}
        </Button>
      </Stack>

      {/* Render saved notes */}
      <Stack spacing={1} sx={{ mt: 2 }}>
        {savedNotes.map((savedNote, index) => (
          <Card
            key={index}
            sx={{
              backgroundColor: '#1B3C73',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              padding: 2,
            }}
          >
            <StickyNote2Icon sx={{ marginRight: 1, color: 'white' }} /> {/* Adding the note icon */}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {savedNote}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <TextField
        fullWidth
        value={note} // Bind input value to note state
        onChange={(e) => setNote(e.target.value)} // Update note state on change
        sx={{
          mt: 2,
          '.MuiInputBase-root textarea': {
            height: '200px !important',
          },
        }}
        placeholder="Type your note here"
        multiline
        rows={2}
        maxRows={10}
      />

      <Button sx={{ minWidth: 120, mt: 4 }} variant="contained" onClick={handleSave}>
        {translate('save')}
      </Button>
    </Paper>
  );
}
