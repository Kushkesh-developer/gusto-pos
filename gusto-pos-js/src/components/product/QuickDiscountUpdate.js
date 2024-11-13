"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Box } from

"@mui/material";
import { quickDiscountMock, selectPriceUpdate } from "@/mock/products";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import QuickUpdateTable from "../widgets/quickUpdateTable/QuickUpdateTable";

import SelectInput from "../widgets/inputs/GSSelectInput";




// Zod schema generation function with localized error messages
const generateZodSchema = (translate) => {
  return z.object({
    product_category: z.
    string().
    min(1, translate("customer_group_name_required"))
  });
};
















const QuickDiscountUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productData, setProductData] = useState(null);

  const handleCategoryChange = (
  event,

  _child) =>
  {
    const category = event.target.value;
    setSelectedCategory(category);
    setProductData(quickDiscountMock[category] || []);
  };
  const {
    handleSubmit,
    // eslint-disable-next-line no-empty-pattern
    formState: {}
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      product_category: ""
    }
  });

  const onSubmit = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate("price_category")}>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                flexDirection: "row",
                width: "100%",
                alignItems: "center"
              }}>

              <SelectInput
                sx={{ mr: 2, minWidth: 220 }}
                label={translate("price_category")}
                options={selectPriceUpdate}
                onChange={(item) => handleCategoryChange(item, null)}
                placeholder={translate("select_category")} />


              <CustomButton
                variant="contained"
                type="submit"
                sx={{ height: 44, marginTop: "32px" }}>

                {translate("retrieve")}
              </CustomButton>
            </Box>
          </FormLayout>
          <Box>
            {/* Conditionally render the table if a category is selected */}
            {selectedCategory && productData &&
            <QuickUpdateTable
              selectedCategory={selectedCategory}
              productData={productData} />

            }
          </Box>
        </Box>
      </form>
    </Box>);

};

export default QuickDiscountUpdate;