import React from "react";
import Image from "next/image";
import { Box, Button, Typography, Input, FormControl, FormHelperText, TextField } from "@mui/material";
import { styled } from "@mui/system";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from '@mui/icons-material/Close';
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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageThumb = styled(Box)({
  position: "relative",
  width: 100,
  height: 100,
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
  category,
  name,
  ...rest
}: ImageUploadFieldProps) {
  return (
    <Box className="imgUploadColMain">
      {label && (
        <Typography variant="body2" component="label" htmlFor="cbcFld" className="form-label image_label">
          {label}
        </Typography>
      )}

      <Box display="flex" alignItems="center" mt={2} position="relative">
        <ImageThumb>
          {selectedImg && (
            <div  style={{
                position: "absolute",
                top: 4,
                right: 4,
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "50%", // This makes the div a circle
                width: 24, // Ensure the width and height are the same
                height: 24,
                display: "flex", // Optional: To center content within the circle
                alignItems: "center", // Optional: To center content within the circle
                justifyContent: "center", // Optional: To center content within the circle
              }}><CloseIcon onClick={onClick} sx={{color:"red", fontSize:16}}>
            </CloseIcon></div>
          )}
          <Image
            src={selectedImg || "/images/upload-placeholder.svg"}
            alt="Upload"
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "inherit",padding:10 }}
          />
        </ImageThumb>

        {quantity && (
          <Box ml={2}>
            <FormControl fullWidth>
              <Typography variant="body2" component="label" htmlFor="additem">
                Quantity
              </Typography>
              <TextField
                type="number"
                id="additem"
                placeholder="0"
                className="form-control"
                sx={{width:"120px"}}
                // inputProps={{ "aria-label": "quantity" }}
                {...rest} // Ensure rest props are passed to the correct input elements
              />
            </FormControl>
          </Box>
        )}

        {!selectedImg && (
          <Box ml={2}>
            {category ? (
              <Button variant="outlined" component="span" className="uploadBtn">
                <Input
                  type="file"
                  className="imgUploadFld"
                  onChange={onChange} // Attach onChange handler to the input
                  {...rest}
                />
              </Button>
            ) : (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload files
                <VisuallyHiddenInput
                  type="file"
                  onChange={onChange} // Attach onChange handler here as well
                  multiple
                />
              </Button>
            )}
          </Box>
        )}
      </Box>

      {errors[name] && touched[name] && (
        <FormHelperText error>{errors[name]}</FormHelperText>
      )}

      {imagelabel && (
        <Typography variant="caption" display="block" className="ingredientName" mt={1}>
          {imagelabel}
        </Typography>
      )}
    </Box>
  );
}

export default GSImageUpload;
