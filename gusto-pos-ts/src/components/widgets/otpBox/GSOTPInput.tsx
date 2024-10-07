import React, { useState, useRef, useEffect } from "react";
import { Box, TextField } from "@mui/material";

interface OtpInputProps {
  onChange?: (_otp:string) => void;
  defaultValue?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ onChange, defaultValue }) => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (defaultValue && defaultValue.length <= 4) {
      const initialOtp = Array(4).fill("");
      for (let i = 0; i < defaultValue?.length; i++) {
        initialOtp[i] = defaultValue[i];
      }
      setOtp(initialOtp);
    }
  }, [defaultValue]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onChange && onChange(newOtp.join(""));

    if (value && index < 4 - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = ( event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,  index: number) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      {otp.map((value, index) => (
        <TextField
          key={index}
          value={value}
          onChange={(e) => handleChange(e.target.value, index)}
      
          inputRef={(el) => (inputRefs.current[index] = el)}
          inputProps={{
            onKeyDown: (e) => handleKeyDown(e, index), // Move onKeyDown here
            maxLength: 1,
            style: { textAlign: "center" },
          }}
          sx={{
            padding: "0px 16px",
            ".MuiInputBase-input": {
              width: "40px",
              height: "40px",
              backgroundColor: "#F0F0F0",
              borderColor: "transparent",
              color: "text.primary",
              fontWeight: "700",
              fontSize: "24px",
              textAlign: "center",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
