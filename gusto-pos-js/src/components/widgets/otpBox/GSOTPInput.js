import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { Box, TextField } from "@mui/material";






const OtpInput = forwardRef(({ onChange, defaultValue }, ref) => {
  const [otp, setOtp] = useState(Array(4).fill(""));

  // Set default value if passed in
  useEffect(() => {
    if (defaultValue && defaultValue.length <= 4) {
      const initialOtp = Array(4).fill("");
      for (let i = 0; i < defaultValue.length; i++) {
        initialOtp[i] = defaultValue[i];
      }
      setOtp(initialOtp);
    }
  }, [defaultValue]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange && onChange(newOtp.join(""));

    if (value && index < 4 - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const inputRefs = React.useRef([]);

  const handleKeyDown = (
  event,
  index) =>
  {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Expose the OTP value via ref for parent to access
  useImperativeHandle(ref, () => ({
    getValue: () => otp.join("") // Combine the OTP parts and expose as a single string
  }));

  return (
    <Box display="flex" justifyContent="center">
      {otp.map((value, index) =>
      <TextField
        key={index}
        value={value}
        onChange={(e) => handleChange(e.target.value, index)}
        inputRef={(el) => inputRefs.current[index] = el}
        inputProps={{
          onKeyDown: (e) => handleKeyDown(e, index),
          maxLength: 1,
          style: { textAlign: "center" }
        }}
        sx={{
          padding: "0px 16px",
          ".MuiInputBase-input": {
            width: "40px",
            height: "40px",
            borderColor: "transparent",
            color: "text.primary",
            fontWeight: "700",
            fontSize: "24px",
            textAlign: "center"
          }
        }} />

      )}
    </Box>);

});

OtpInput.displayName = "OtpInput";

export default OtpInput;