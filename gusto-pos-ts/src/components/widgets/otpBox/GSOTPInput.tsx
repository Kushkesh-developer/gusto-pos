import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';
import { Box, TextField } from '@mui/material';

interface OtpInputProps {
  onChange?: (_otp: string) => void;
  defaultValue?: string;
}

interface OtpInputRef {
  getValue: () => string;
}

const OtpInput = forwardRef<OtpInputRef, OtpInputProps>(({ onChange, defaultValue }, ref) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));

  // Set default value if passed in
  useEffect(() => {
    if (defaultValue && defaultValue.length <= 4) {
      const initialOtp = Array(4).fill('');
      for (let i = 0; i < defaultValue.length; i++) {
        initialOtp[i] = defaultValue[i];
      }
      setOtp(initialOtp);
    }
  }, [defaultValue]);

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange?.(newOtp.join(''));
    if (value && index < 4 - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Corrected: Used useCallback to memoize the handleKeyDown function
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
      if (event.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [otp], // Corrected: Added otp as a dependency so that the function is updated when otp changes
  );

  // Expose the OTP value via ref for parent to access
  useImperativeHandle(
    ref,
    (): OtpInputRef => ({
      getValue: () => otp.join(''),
    }),
    [otp],
  );

  return (
    <Box display="flex" justifyContent="center">
      {otp.map((value, index) => (
        <TextField
          key={index}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
          inputRef={(el) => (inputRefs.current[index] = el)} // Corrected: This assignment is now properly handled
          inputProps={{
            onKeyDown: (e) => handleKeyDown(e, index), // Corrected: Used memoized handleKeyDown function
            maxLength: 1,
            style: { textAlign: 'center' },
          }}
          sx={{
            padding: { md: '20px 16px', xs: '0px 6px' },
            '.MuiInputBase-input': {
              width: { xs: '75%', md: '40px' },
              height: { xs: '75%', md: '40px' },
              borderColor: 'transparent',
              color: 'text.primary',
              fontWeight: '700',
              fontSize: '24px',
              textAlign: 'center',
            },
          }}
        />
      ))}
    </Box>
  );
});

OtpInput.displayName = 'OtpInput';
export default OtpInput;
