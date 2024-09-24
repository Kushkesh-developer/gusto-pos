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
  errors?: { [key: string]: string };
  quantity?: boolean;
  touched?: { [key: string]: boolean };
  selectedImg?: string;
  label?: string;
  imagelabel?: string;
  onClick?: () => void;
  category?: boolean;
  name: string;
  onChange?: () => void;
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

      <Box display="flex" alignItems="center" mt={2} position="relative">
        <Box display="flex" flexDirection="column" alignItems="center">
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
              <VisuallyHiddenInput type="file" onChange={onChange} multiple />
            </Button>
          )}
        </Box>

        {quantity && (
          <Box ml={2} mb={15}>
            <FormControl fullWidth>
              <Typography variant="body2" component="label" htmlFor="additem">
                Quantity
              </Typography>
              <TextField
                type="number"
                id="additem"
                placeholder="0"
                className="form-control"
                sx={{ width: "160px", height: "20px" }}
                {...rest}
              />
            </FormControl>
          </Box>
        )}
      </Box>

      {errors[name] && touched[name] && (
        <FormHelperText error>{errors[name]}</FormHelperText>
      )}

      {imagelabel && (
        <Typography
          variant="caption"
          display="block"
          className="ingredientName"
          mt={1}
        >
          {imagelabel}
        </Typography>
      )}
    </Box>
  );
}

export default GSImageUpload;
