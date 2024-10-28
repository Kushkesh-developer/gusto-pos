"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  FormControl,
  SelectChangeEvent,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";
// import {quickDiscountMock,selectPriceUpdate} from "@/mock/products"
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import QuickImageUpdateTable from "../widgets/quickUpdateTable/QuickImageUpdateTable";
import { TranslateFn } from "@/types/localization-types";

interface FormData {
  product_category: string;
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    product_category: z
      .string()
      .min(1, translate("customer_group_name_required")),
  });
};

const SelectPriceUpdate = [
  { value: "Main", label: "Main" },
  { value: "Burger 1", label: "Burger 1" },
];

const mockData: { [key: string]: ProductData[] } = {
  Burger: [
    {
      name: "Burger A",
      price: 10,
      specialPrice1: 9,
      specialPrice2: 8,
      specialPrice3: 7,
      minQty1: 10,
      minQty2: 20,
      minQty3: 30,
    },
    {
      name: "Burger B",
      price: 12,
      specialPrice1: 11,
      specialPrice2: 10,
      specialPrice3: 9,
      minQty1: 15,
      minQty2: 25,
      minQty3: 35,
    },
  ],
  "Burger 1": [
    {
      name: "Burger C",
      price: 15,
      specialPrice1: 14,
      specialPrice2: 13,
      specialPrice3: 12,
      minQty1: 12,
      minQty2: 22,
      minQty3: 32,
    },
  ],
};

interface ProductData {
  name: string;
  price: number;
  specialPrice1: number;
  specialPrice2: number;
  specialPrice3: number;
  minQty1: number;
  minQty2: number;
  minQty3: number;
}

const QuickImageUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productData, setProductData] = useState<ProductData[] | null>(null);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    setProductData(mockData[category] || []);
  };

  const { handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_category: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = () => {};

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("item_category")}>
            <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
              <Box
                sx={{
                  flex: 0.5,
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <InputLabel sx={{ color: "text.primary" }}>
                  {translate("menu_item_category")}
                </InputLabel>

                <FormControl sx={{ m: 1, minWidth: "50%" }}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>Select Item Category</em>
                    </MenuItem>
                    {SelectPriceUpdate.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                mt={4}
                alignItems="center"
              >
                <CustomButton variant="contained" type="submit">
                  {translate("retrieve")}
                </CustomButton>
              </Box>
            </Box>
          </FormLayout>
          <Box>
            {/* Conditionally render the table if a category is selected */}
            {selectedCategory && productData && (
              <QuickImageUpdateTable
                selectedCategory={selectedCategory}
                productData={productData}
              />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default QuickImageUpdate;
