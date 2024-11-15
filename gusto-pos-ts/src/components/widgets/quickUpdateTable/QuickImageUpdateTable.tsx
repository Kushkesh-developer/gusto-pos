import React from "react";
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
  Box,
} from "@mui/material";
import GSSwitchButton from "@/components/widgets/switch/GSSwitchButton";
import Image from "next/image";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import {
  ProductData,
  CategoryState,
} from "@/src/components/product/QuickImageUpdate"; // Make sure the path is correct

interface QuickImageUpdateTableProps {
  selectedCategory: string;
  productData: ProductData[];
  categoryState: CategoryState;
  onStateUpdate: (newState: Partial<CategoryState>) => void;
}

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
  overflow: "hidden",
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

const QuickImageUpdateTable: React.FC<QuickImageUpdateTableProps> = ({
  productData,
  categoryState,
  onStateUpdate,
}) => {
  const handleImageUpload =
    (index: number) => async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        const newImages = [...categoryState.productImages];
        const newHasCustomImage = [...categoryState.hasCustomImage];
        newImages[index] = imageUrl;
        newHasCustomImage[index] = true;
        onStateUpdate({
          productImages: newImages,
          hasCustomImage: newHasCustomImage,
        });
      }
    };

  const handleNameChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newNames = [...categoryState.productNames];
      newNames[index] = event.target.value;
      onStateUpdate({ productNames: newNames });
    };

  const handleRemoveImage = (index: number) => {
    const newImages = [...categoryState.productImages];
    const newHasCustomImage = [...categoryState.hasCustomImage];
    newImages[index] = productData[index].image; // Reset to default image
    newHasCustomImage[index] = false;
    onStateUpdate({
      productImages: newImages,
      hasCustomImage: newHasCustomImage,
    });
  };

  const handlePosToggle = (index: number) => {
    const newShowOnPos = [...categoryState.showOnPos];
    newShowOnPos[index] = !newShowOnPos[index];
    onStateUpdate({ showOnPos: newShowOnPos });
  };

  const handleOnlineToggle = (index: number) => {
    const newShowOnline = [...categoryState.showOnline];
    newShowOnline[index] = !newShowOnline[index];
    onStateUpdate({ showOnline: newShowOnline });
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
                <TableCell>
                  <TextField
                    fullWidth
                    value={categoryState.productNames[index]}
                    onChange={handleNameChange(index)}
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
                          {categoryState.hasCustomImage[index] && (
                            <Box
                              sx={{
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
                                zIndex: 1,
                              }}
                              onClick={() => handleRemoveImage(index)}
                            >
                              <CloseIcon sx={{ color: "red", fontSize: 16 }} />
                            </Box>
                          )}
                          <Box
                            sx={{
                              position: "relative",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            <Image
                              src={categoryState.productImages[index]}
                              alt={product.name}
                              fill
                              style={{
                                objectFit: "contain",
                                padding: "4px",
                              }}
                            />
                          </Box>
                        </ImageThumb>
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Button
                    component="label"
                    variant="contained"
                    tabIndex={-1}
                    sx={{ mt: 1 }}
                  >
                    {categoryState.hasCustomImage[index]
                      ? "Change Image"
                      : "Image"}
                    <VisuallyHiddenInput
                      type="file"
                      onChange={handleImageUpload(index)}
                      accept="image/*"
                    />
                  </Button>
                </TableCell>
                <TableCell>
                  <GSSwitchButton
                    checked={categoryState.showOnPos[index]}
                    onChange={() => handlePosToggle(index)}
                  />
                </TableCell>
                <TableCell>
                  <GSSwitchButton
                    checked={categoryState.showOnline[index]}
                    onChange={() => handleOnlineToggle(index)}
                  />
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
