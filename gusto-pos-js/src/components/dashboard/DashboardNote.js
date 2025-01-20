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

  // Handle deleting a note
  const handleDelete = (index) => {
    setSavedNotes((prevNotes) => prevNotes.filter((_, i) => i !== index)); // Remove the note at the given index
  };

  return (
    <Paper sx={{ p: 3, flex: 1, height: 'fit-content' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>{translate('note')}</Typography>
      </Stack>

      {/* Render saved notes */}
      <Stack spacing={1} sx={{ mt: 2 }}>
        {savedNotes.map((savedNote, index) =>
        <Card
          key={index}
          sx={{
            backgroundColor: '#1B3C73',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            mb: 1 // Adding a margin bottom to create a gap between notes
          }}>

            <StickyNote2Icon sx={{ marginRight: 1, color: 'white' }} /> {/* Adding the note icon */}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {savedNote}
              </Typography>
            </CardContent>
            {/* Add Delete Button for each note */}
            <Button
            sx={{ ml: 2, color: 'white', textTransform: 'none' }}
            onClick={() => handleDelete(index)}>

              {translate('delete')}
            </Button>
          </Card>
        )}
      </Stack>

      <TextField
        fullWidth
        value={note} // Bind input value to note state
        onChange={(e) => setNote(e.target.value)} // Update note state on change
        sx={{
          mt: 2,
          '.MuiInputBase-root textarea': {
            height: '200px !important'
          }
        }}
        placeholder={translate('type_your_note_here')}
        multiline
        rows={2}
        maxRows={10} />


      {/* Buttons with 16px gap */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button sx={{ minWidth: 120 }} variant="contained" onClick={handleSave}>
          {translate('save')}
        </Button>
        <Button sx={{ minWidth: 120 }} variant="contained" onClick={() => setNote('')}>
          {translate('clear')} {/* Clear button added to reset the note field */}
        </Button>
      </Stack>
    </Paper>);

}