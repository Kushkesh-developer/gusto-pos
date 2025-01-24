import { useLocalization } from '@/context/LocalizationProvider';
import {
  Button,
  Card,
  CardContent,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import DeleteIcon from '@mui/icons-material/Delete';

export function DashboardNote() {
  const { translate } = useLocalization();

  // State for the current note and saved notes
  const [note, setNote] = useState<string>('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  // Handle saving the note
  const handleSave = () => {
    if (note.trim()) {
      setSavedNotes((prevNotes) => [...prevNotes, note]);
      setNote('');
    }
  };

  // Handle deleting a note
  const handleDelete = (index: number) => {
    setSavedNotes((prevNotes) => prevNotes.filter((_, i) => i !== index));
  };

  // Function to split text into lines and add icons
  const renderNoteWithIcons = (text: string) => {
    return text.split('\n').map((line, index) => (
      <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
        <StickyNote2Icon
          sx={{
            marginRight: 1,
            color: 'white',
            fontSize: '1rem',
            marginTop: '3px',
          }}
        />
        <span style={{ flex: 1 }}>{line || ' '}</span>
      </div>
    ));
  };

  return (
    <Paper sx={{ p: 3, flex: 1, height: 'fit-content' }}>
      <Stack direction={'row'} justifyContent={'space-between'}>
        <Typography>{translate('note')}</Typography>
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
              padding: 2,
              mb: 1,
            }}
          >
            <CardContent
              sx={{
                flex: 1,
                overflow: 'hidden',
                wordWrap: 'break-word',
                padding: '8px !important',
              }}
            >
              <Typography
                variant="body2"
                component="div"
                sx={{
                  color: 'white',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {renderNoteWithIcons(savedNote)}
              </Typography>
            </CardContent>
            <IconButton
              onClick={() => handleDelete(index)}
              sx={{
                color: 'white',
                alignSelf: 'flex-start',
                marginTop: '4px',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        ))}
      </Stack>

      <TextField
        fullWidth
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{
          mt: 2,
          '.MuiInputBase-root textarea': {
            height: '200px !important',
          },
        }}
        placeholder={translate('type_your_note_here')}
        multiline
        rows={2}
        maxRows={10}
      />

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button sx={{ minWidth: 120 }} variant="contained" onClick={handleSave}>
          {translate('save')}
        </Button>
        <Button sx={{ minWidth: 120 }} variant="contained" onClick={() => setNote('')}>
          {translate('clear')}
        </Button>
      </Stack>
    </Paper>
  );
}
