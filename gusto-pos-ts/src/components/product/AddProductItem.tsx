"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";

import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import GSSwitchButton from "../widgets/switch/GSSwitchButton";
import GSImageUpload from "../widgets/image/GSImageUpload";
interface FormData {
  itemName: string;
  itemNamePOS: string;
  description: string;
  unit: string;
  item_category: string;
  product_sKU_barcode: string;
  chineseName1: string;
  chineseName2: string;
  chineseName3: string;
  Valid_From_Date: Date;
  Valid_to_Date: Date;
  Valid_From_Time: string;
  Valid_To_Time: string;
  // ... other fields
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: any) => {
  return z.object({
    itemName: z.string().min(1, translate("itemName_required")),
    itemNamePOS: z
      .string()
      .min(1, translate("item_short_name_on_pOS_( English )_required")),
    description: z.string().min(1, translate("description_required")),
    unit: z.string().email(translate("unit_required")),
    item_category: z.string().min(1, translate("item_category_required")),
    product_sKU_barcode: z
      .string()
      .min(1, translate("product_sKU_barcode_required")),
  });
};

const AddProductItem = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [showTextFields, setShowTextFields] = useState(false);
  const SelectGender = [
    { value: "Category1", label: "Category 1" },
    { value: "Category2", label: "Category 2" },
  ];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: "",
      itemNamePOS: "",
      description: "",
      unit: "",
      item_category: "",
      product_sKU_barcode: "",
      chineseName1: "",
      chineseName2: "",
      chineseName3: "",
      Valid_From_Date: new Date(),
      Valid_to_Date: new Date(),
      Valid_To_Time: "",
      Valid_From_Time: "",
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  const [selectedImg, setSelectedImg] = useState<string | undefined>();
  const [Imageerrors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImg(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImg(undefined);
  };

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowTextFields(event.target.checked);
  };
  return (
    <Box
      sx={{
        maxWidth: "1140px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5} bgcolor="transparent">
          <FormLayout cardHeading={translate("Item_detail")}>
            <React.Fragment>
              <Controller
                control={control}
                name="itemName"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("item_name_( English )")}
                    helperText={errors.itemName?.message}
                    error={Boolean(errors.itemName)}
                    placeholder="Enter Item Name"
                  />
                )}
              />
              <Controller
                control={control}
                name="itemNamePOS"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("item_short_name_on_pOS_( English )")}
                    helperText={errors.itemNamePOS?.message}
                    error={Boolean(errors.itemNamePOS)}
                    placeholder="Enter Item Name POS"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("description")}
                    helperText={errors.description?.message}
                    error={Boolean(errors.description)}
                    placeholder="Enter Description"
                  />
                )}
              />
              <Controller
                control={control}
                name="unit"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("unit")}
                    helperText={errors.unit?.message}
                    error={Boolean(errors.unit)}
                    placeholder="Enter PC / Kg / gram"
                  />
                )}
              />
            </React.Fragment>

            <React.Fragment>
              <Controller
                control={control}
                name="item_category"
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    options={SelectGender}
                    placeholder="Select Item Category"
                    label={translate("item_category")}
                    helperText={errors.item_category?.message}
                    error={Boolean(errors.item_category)}
                  />
                )}
              />
              <Controller
                control={control}
                name="product_sKU_barcode"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("product_sKU_barcode")}
                    helperText={errors.product_sKU_barcode?.message}
                    error={Boolean(errors.product_sKU_barcode)}
                    placeholder="Enter Item Category"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Box sx={{ width: "100%" }}>
                <GSSwitchButton
                  checked={showTextFields}
                  onChange={handleToggleChange}
                  label="Add Chinese name :"
                  labelPlacement="start"
                />
                {showTextFields && (
                  <Box mt={2} sx={{ width: "49%", gap: 3 }} mb={3}>
                    <Controller
                      control={control}
                      name="chineseName1"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 1")}
                          helperText={errors.chineseName1?.message}
                          error={Boolean(errors.chineseName1)}
                          placeholder="Enter Chinese Name 1"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName2"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 2")}
                          helperText={errors.chineseName2?.message}
                          error={Boolean(errors.chineseName2)}
                          placeholder="Enter Chinese Name 2"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName3"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 3")}
                          helperText={errors.chineseName3?.message}
                          error={Boolean(errors.chineseName3)}
                          placeholder="Enter Chinese Name 3"
                        />
                      )}
                    />
                  </Box>
                )}
              </Box>
            </React.Fragment>
          </FormLayout>
        </Box>
        <Box mb={5} sx={{ width: "100%" }}>
          <FormLayout cardHeading={translate("recipe")}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "full" }}
            >
              <Box sx={{ width: "50%" }}>
                {" "}
                <Controller
                  control={control}
                  name="chineseName3"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label={translate("Chinese Name 3")}
                      helperText={errors.chineseName3?.message}
                      error={Boolean(errors.chineseName3)}
                      placeholder="Enter Chinese Name 3"
                    />
                  )}
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "row", gap: 2, mt: 2 }}
              >
                <GSImageUpload
                  name="productImage"
                  label="Product Image"
                  selectedImg={selectedImg}
                  onClick={handleRemoveImage}
                  quantity={true}
                  errors={Imageerrors}
                  touched={touched}
                  imagelabel="Bun"
                  category={false}
                  onChange={handleImageUpload} // Pass the onChange event handler
                />
                <GSImageUpload
                  name="productImage"
                  label="Product Image"
                  selectedImg={selectedImg}
                  onClick={handleRemoveImage}
                  quantity={true}
                  errors={Imageerrors}
                  touched={touched}
                  imagelabel="petty"
                  category={false}
                  onChange={handleImageUpload} // Pass the onChange event handler
                />{" "}
                <GSImageUpload
                  name="productImage"
                  label="Product Image"
                  selectedImg={selectedImg}
                  onClick={handleRemoveImage}
                  quantity={true}
                  errors={Imageerrors}
                  touched={touched}
                  imagelabel="veg"
                  category={false}
                  onChange={handleImageUpload} // Pass the onChange event handler
                />{" "}
                <GSImageUpload
                  name="productImage"
                  label="Product Image"
                  selectedImg={selectedImg}
                  onClick={handleRemoveImage}
                  quantity={true}
                  errors={Imageerrors}
                  touched={touched}
                  imagelabel="ham"
                  category={false}
                  onChange={handleImageUpload} // Pass the onChange event handler
                />
              </Box>
            </Box>
          </FormLayout>
          <FormLayout cardHeading={translate("Item_detail")}>
            <React.Fragment>
              <Box sx={{ width: "100%" }}>
                <GSSwitchButton
                  checked={showTextFields}
                  onChange={handleToggleChange}
                  label="Add Chinese name :"
                />
                {showTextFields && (
                  <Box mt={2} sx={{ width: "49%", gap: 3 }} mb={3}>
                    <Controller
                      control={control}
                      name="chineseName1"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 1")}
                          helperText={errors.chineseName1?.message}
                          error={Boolean(errors.chineseName1)}
                          placeholder="Enter Chinese Name 1"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName2"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 2")}
                          helperText={errors.chineseName2?.message}
                          error={Boolean(errors.chineseName2)}
                          placeholder="Enter Chinese Name 2"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName3"
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          label={translate("Chinese Name 3")}
                          helperText={errors.chineseName3?.message}
                          error={Boolean(errors.chineseName3)}
                          placeholder="Enter Chinese Name 3"
                        />
                      )}
                    />
                  </Box>
                )}
              </Box>
            </React.Fragment>
          </FormLayout>
          <FormLayout cardHeading={translate("price")}>
            <>Content</>
          </FormLayout>
          <FormLayout cardHeading={translate("outlets")}>
            <>Content</>
          </FormLayout>

          <Box>
            <FormLayout cardHeading={translate("availability")}>
              <React.Fragment>
                <DateInput
                  id="Valid_From_Date"
                  label={translate("Valid_From_Date")}
                  register={register}
                  error={errors.Valid_From_Date?.message}
                />

                <DateInput
                  id="Valid_to_Date"
                  label={translate("Valid_to_Date")}
                  register={register}
                  error={errors.Valid_to_Date?.message}
                />
                <Controller
                  name="Valid_From_Time"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label={translate("Valid_From_Time")}
                      options={SelectGender}
                      placeholder="Select Time"
                      helperText={errors.Valid_From_Time?.message}
                      error={Boolean(errors.Valid_From_Time)}
                    />
                  )}
                />
                <Controller
                  name="Valid_To_Time"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      label={translate("Valid_To_Time")}
                      options={SelectGender}
                      placeholder="Select Time"
                      helperText={errors.Valid_To_Time?.message}
                      error={Boolean(errors.Valid_To_Time)}
                    />
                  )}
                />
              </React.Fragment>
            </FormLayout>
          </Box>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
              {translate("cancel")}
            </CustomButton>

            <CustomButton variant="contained" type="submit">
              {translate("save")}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddProductItem;
