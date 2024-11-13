import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import GSSwitchButton from "../switch/GSSwitchButton";
import Image from "next/image";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const ImageThumb = styled(Box)({
  position: "relative",
  width: 60,
  height: 60,
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
const QuickImageUpdateTable = ({ productData }) => {
  const [selectedImg, setSelectedImg] = useState();
  const [productNames, setProductNames] = useState(
    productData.map((product) => product.name),
  );
  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
    }
  };
  const handleNameChange = (index) => (event) => {
    const updatedNames = [...productNames];
    updatedNames[index] = event.target.value;
    setProductNames(updatedNames);
  };
  const handleRemoveImage = () => {
    setSelectedImg(undefined);
  };
  return (
    <Paper elevation={3} sx={{ maxWidth: "100%", boxShadow: 0, width: "100%" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Upload Image</TableCell>
              <TableCell>Show / Hide on POS</TableCell>
              <TableCell>Show / Hide on Online</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product, index) => (
              <TableRow key={index}>
                <TableCell sx={{ height: "24px" }}>
                  <TextField
                    fullWidth
                    value={productNames[index]}
                    onChange={handleNameChange(index)} // Handle text change
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Box className="imgUploadColMain">
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={2}
                      position="relative"
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
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
                                onClick={handleRemoveImage}
                                sx={{ color: "red", fontSize: 16 }}
                              />
                            </div>
                          )}
                          <Image
                            src={
                              selectedImg || "/images/upload-placeholder.svg"
                            }
                            alt="Upload"
                            width={100}
                            height={100}
                            style={{
                              objectFit: "cover",
                              borderRadius: "inherit",
                              padding: 10,
                              width: 60,
                              height: 60,
                              backgroundColor: selectedImg || "#f5f5f5",
                            }}
                          />
                        </ImageThumb>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {!selectedImg && (
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      tabIndex={-1}
                      sx={{ mt: 1 }}
                    >
                      Upload
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleImageUpload}
                        multiple
                      />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <GSSwitchButton />{" "}
                </TableCell>
                <TableCell>
                  <GSSwitchButton />{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default QuickImageUpdateTable;
