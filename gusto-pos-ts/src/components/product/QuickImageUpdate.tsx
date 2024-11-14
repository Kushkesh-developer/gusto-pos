"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, SelectChangeEvent } from "@mui/material";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import CustomButton from "@/components/widgets/buttons/GSCustomButton";
import QuickImageUpdateTable from "@/components/widgets/quickUpdateTable/QuickImageUpdateTable";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
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
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
              }}
            >
              <SelectInput
                sx={{ mr: 2, minWidth: 220 }}
                label={translate("menu_item_category")}
                options={SelectPriceUpdate}
                onChange={(item) => handleCategoryChange(item)}
                placeholder={translate("select_category")}
              />

              <CustomButton
                variant="contained"
                type="submit"
                sx={{ height: 44, marginTop: "32px" }}
              >
                {translate("retrieve")}
              </CustomButton>
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
