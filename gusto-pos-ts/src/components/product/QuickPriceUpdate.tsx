"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import {quickDiscountMock,selectPriceUpdate} from "@/mock/products"
import QuickUpdateTable from "../widgets/quickUpdateTable/QuickUpdateTable";
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

const QuickPriceUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productData, setProductData] = useState<ProductData[] | null>(null);

  const handleCategoryChange = (
    event: SelectChangeEvent<string>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _child: React.ReactNode
  ) => {
    const category = event.target.value as string;
    setSelectedCategory(category);
    setProductData(quickDiscountMock[category] || []);
  };

  const {
    handleSubmit,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = useForm<FormData>({
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
          <FormLayout cardHeading={translate("price_category")}>
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
                  {translate("product_category")}
                </InputLabel>
                <FormControl sx={{ m: 1, minWidth: "50%" }}>
                  <Select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>Select Category</em>
                    </MenuItem>
                    {selectPriceUpdate.map((option) => (
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
              <QuickUpdateTable
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

export default QuickPriceUpdate;
