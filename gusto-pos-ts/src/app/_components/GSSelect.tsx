import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import type { FC } from 'react';

interface GSSelectInputProps {
    value: string,
    options: string[],
    handleChange: (event: SelectChangeEvent) => void
}

function GSSelectInput({ value, options, handleChange }: GSSelectInputProps) {

    return (
        <FormControl sx={{ minWidth: 140, mr: 4 }} size="small">
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                displayEmpty
                onChange={handleChange}
                sx={{ fontSize: 14, height: 44 }}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default GSSelectInput;
