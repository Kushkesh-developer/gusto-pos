import React from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

interface ImageUploadFieldProps {
  errors?: { [key: string]: string | undefined };
  quantity?: boolean;
  touched?: { [key: string]: boolean };
  selectedImg?: string;
  label?: string;
  imagelabel?: string;
  onClick?: () => void;
  category?: boolean;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageThumb = styled(Box)({
  position: "relative",
  width: 80,
  height: 80,
  border: "1px solid #ddd",
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 8,
  backgroundColor: "#f5f5f5",
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function GSImageUpload({
  errors = {},
  quantity,
  touched = {},
  selectedImg,
  label,
  imagelabel,
  onClick,
  onChange,
  name,
  ...rest
}: ImageUploadFieldProps) {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Call onChange if it exists
    if (onChange) {
      onChange(event); // Pass the event up to the parent
    }

    // Handle image upload logic
    if (event.target.files && event.target.files.length > 0) {
      // Example: Mark the field as touched (you might need state management)
      touched[name] = true; // This won't trigger a re-render
    }
  };

  return (
    <Box className="imgUploadColMain">
      {label && (
        <Typography
          variant="body2"
          component="label"
          htmlFor="cbcFld"
          className="form-label image_label"
        >
          {label}
        </Typography>
      )}

      <Box display="flex" gap="10px" mt={2} position="relative">
        <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
          <ImageThumb>
            {selectedImg && (
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  cursor: "pointer",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CloseIcon
                  onClick={onClick}
                  sx={{ color: "red", fontSize: 16 }}
                />
              </div>
            )}
            <Image
              src={selectedImg || "/images/upload-placeholder.svg"}
              alt="Upload"
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "inherit",
                padding: 10,
              }}
            />
          </ImageThumb>

          {!selectedImg && (
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon sx={{ fontSize: "10px" }} />}
              sx={{ mt: 1, width: "80px", fontSize: "12px" }}
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                onChange={handleImageChange} // Use the new handler
                multiple
              />
            </Button>
          )}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {" "}
          {/* Flexbox with column layout */}
          {quantity && (
            <Box ml={2} mb={2}>
              <FormControl fullWidth>
                <Typography
                  variant="body2"
                  component="label"
                  htmlFor="additem"
                  mb={"2px"}
                >
                  Quantity
                </Typography>
                <TextField
                  type="text"
                  id="additem"
                  placeholder="0"
                  className="form-control"
                  sx={{
                    '& .MuiInputBase-root': {
                      '& .MuiInputBase-input': {
                        padding: '7px',  // Apply your desired padding here
                      },
                    },
                  }}
                  {...rest}
                />
              </FormControl>
            </Box>
          )}
          {imagelabel && (
            <Box ml={2}>
              <FormControl fullWidth>
                <Typography
                  variant="body2"
                  component="label"
                  htmlFor="additem"
                  mb={"2px"}
                >
                  Ingredient
                </Typography>
                <TextField
                  type="text"
                  id="additem"
                  placeholder="Ingredient"
                  className="form-control"
                  sx={{
                    '& .MuiInputBase-root': {
                      '& .MuiInputBase-input': {
                        padding: '7px',  // Apply your desired padding here
                      },
                    },
                  }}
                  {...rest}
                />
              </FormControl>
            </Box>
          )}
        </Box>
      </Box>
      {errors[name] && touched[name] && (
        <FormHelperText error>{errors[name]}</FormHelperText>
      )}
    </Box>
  );
}

export default GSImageUpload;
