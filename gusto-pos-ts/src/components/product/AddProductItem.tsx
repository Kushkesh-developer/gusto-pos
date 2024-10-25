"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box, Button } from "@mui/material";
import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import GSSwitchButton from "../widgets/switch/GSSwitchButton";
import { TranslateFn } from "@/types/localization-types";
import GSImageUpload from "../widgets/image/GSImageUpload";
import CustomStack from "../widgets/inputs/GSCustomstack";
type SwitchStates = {
  hot: boolean;
  cold: boolean;
  bread: boolean;
  sides: boolean;
  chineseName: boolean;
};
interface ImageUpload {
  imagelabel: string;
  selectedImg: string;
  quantity: boolean;
}
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
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    itemName: z.string().min(1, translate("item_name_required")),
    itemNamePOS: z
      .string()
      .min(1, translate("item_short_name_on_pos_(english)_required")),
    description: z.string().min(1, translate("description_required")),
    unit: z.string().email(translate("unit_required")),
    item_category: z.string().min(1, translate("item_category_required")),
    product_sKU_barcode: z
      .string()
      .min(1, translate("product_sku_barcode_required")),
  });
};

const AddProductItem = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const SelectGender = [
    { value: "Category1", label: "Category 1" },
    { value: "Category2", label: "Category 2" },
  ];
  const {
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
  const [showTextFields, setShowTextfield] = useState(false);
  const onSubmit: SubmitHandler<FormData> = () => {};
  const [images, setImages] = useState<ImageUpload[]>([
    { imagelabel: "Bun", selectedImg: "", quantity: true },
    { imagelabel: "Petty", selectedImg: "", quantity: true },
    { imagelabel: "Veg", selectedImg: "", quantity: true },
    { imagelabel: "Ham", selectedImg: "", quantity: true },
  ]);
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    hot: false,
    cold: false,
    bread: false,
    sides: false,
    chineseName: false,
  });
  const handleToggleChange = (name: keyof SwitchStates) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    setShowTextfield((prev) => !prev); // Toggle visibility
  };

  const handleImageUpload = (index: number, file: string) => {
    const newImages = [...images];
    newImages[index].selectedImg = file;
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const addImageUploadField = () => {
    const newImageLabel = `Image ${images.length + 1}`;
    setImages([
      ...images,
      { imagelabel: newImageLabel, selectedImg: "", quantity: true },
    ]);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5} bgcolor="transparent">
          <FormLayout cardHeading={translate("item_detail")}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_name_(english)")}
                  helperText={errors.itemName?.message}
                  error={Boolean(errors.itemName)}
                  placeholder={translate("enter_item_name")}
                />
              )}
            />
            <Controller
              control={control}
              name="itemNamePOS"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_short_name_on_pos_(english)")}
                  helperText={errors.itemNamePOS?.message}
                  error={Boolean(errors.itemNamePOS)}
                  placeholder={translate("enter_item_name_pos")}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("description")}
                  helperText={errors.description?.message}
                  error={Boolean(errors.description)}
                  placeholder={translate("enter_description")}
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
                  placeholder={translate("enter_pc/kg/gram")}
                />
              )}
            />

            <Controller
              control={control}
              name="item_category"
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={SelectGender}
                  placeholder={translate("select_item_category")}
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
                  label={translate("product_sku_barcode")}
                  helperText={errors.product_sKU_barcode?.message}
                  error={Boolean(errors.product_sKU_barcode)}
                  placeholder={translate("enter_item_category")}
                />
              )}
            />

            <GSSwitchButton
              checked={switchStates.chineseName}
              onChange={() => handleToggleChange("chineseName")}
              label={translate("add_chinese_name")}
              labelPlacement="start"
            />
            <CustomStack withoutGrid>
            <Box>
              {showTextFields && (
                <Box
                  mt={2}
                  sx={{
                    width: "100%",
                    gap: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    px:2
                  }}
                  mb={3}
                >
                  <Controller
                    control={control}
                    name="chineseName1"
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        label={translate("Chinese Name 1")}
                        helperText={errors.chineseName1?.message}
                        error={Boolean(errors.chineseName1)}
                        placeholder={translate("enter_chinese_name")}
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
                        placeholder={translate("enter_chinese_name")}
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
                        placeholder={translate("enter_chinese_name")}
                      />
                    )}
                  />
                </Box>
              )}
            </Box>
            </CustomStack>
          </FormLayout>
        </Box>
       
        <Box mb={2} sx={{ width: "100%" }}>
          <FormLayout cardHeading={translate("recipe")}>
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "full" }}
            >
              <Box sx={{ width: "100%" }}>
                {" "}
                <Controller
                  control={control}
                  name="chineseName3"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label={translate("chinese_name_3")}
                      helperText={errors.chineseName3?.message}
                      error={Boolean(errors.chineseName3)}
                      placeholder={translate("enter_chinese_name_3")}
                    />
                  )}
                />
              </Box>
              
              <Box>
                {/* Render the dynamic GSImageUpload components */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2,mb:3 }}>
                  {images.map((image, index) => (
                    <GSImageUpload
                      key={index}
                      name={`productImage_${index}`}
                      selectedImg={image.selectedImg}
                      quantity
                      imagelabel={image.imagelabel}
                      onClick={() => handleRemoveImage(index)}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          handleImageUpload(
                            index,
                            URL.createObjectURL(event.target.files[0])
                          );
                        }
                      }}
                    />
                  ))}
                </Box>

                {/* Add button to dynamically add new GSImageUpload fields */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addImageUploadField}
                  sx={{ mt: 2 }}
                >
                 {translate("add_image_upload")}
                </Button>
              </Box>
            </Box>
          </FormLayout>
          <FormLayout cardHeading={translate("modifiers")}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {/* Hot Section */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 41,
                  height: "60px",
                }}
              >
                <GSSwitchButton
                  checked={switchStates.hot}
                  onChange={() => handleToggleChange("hot")}
                  label={translate("hot")}
                />
                {switchStates.hot && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: "10px" }}>
                      Minimum Selection
                    </span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Cold Section */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 40,
                  height: "60px",
                }}
              >
                <GSSwitchButton
                  checked={switchStates.cold}
                  onChange={() => handleToggleChange("cold")}
                  label={translate("cold")}
                />
                {switchStates.cold && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: "10px" }}>
                      Minimum Selection
                    </span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Types of Bread Section */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 30,
                  height: "60px",
                }}
              >
                <GSSwitchButton
                  checked={switchStates.bread}
                  onChange={() => handleToggleChange("bread")}
                  label={translate("types_of_bread")}
                />
                {switchStates.bread && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: "10px" }}>
                      Minimum Selection
                    </span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Choice of Sides Section */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 30,
                  height: "60px",
                }}
              >
                <GSSwitchButton
                  checked={switchStates.sides}
                  onChange={() => handleToggleChange("sides")}
                  label={translate("choice_of_sides")}
                />
                {switchStates.sides && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: "10px" }}>
                      Minimum Selection
                    </span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        marginRight: "10px",
                        marginLeft: "10px",
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>
            </Box>
          </FormLayout>
          <FormLayout cardHeading={translate("price")}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_name_(english)")}
                  helperText={errors.itemName?.message}
                  error={Boolean(errors.itemName)}
                  placeholder={translate("enter_item_name")}
                />
              )}
            />
            <Controller
              control={control}
              name="itemNamePOS"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_short_name_on_pos_(english)")}
                  helperText={errors.itemNamePOS?.message}
                  error={Boolean(errors.itemNamePOS)}
                  placeholder={translate("enter_item_name_pos")}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("description")}
                  helperText={errors.description?.message}
                  error={Boolean(errors.description)}
                  placeholder={translate("enter_description")}
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
                  placeholder={translate("enter_pc/kg/gram")}
                />
              )}
            />

            <Controller
              control={control}
              name="item_category"
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={SelectGender}
                  placeholder={translate("select_item_category")}
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
                  label={translate("product_sku_barcode")}
                  helperText={errors.product_sKU_barcode?.message}
                  error={Boolean(errors.product_sKU_barcode)}
                  placeholder={translate("enter_item_category")}
                />
              )}
            />
          </FormLayout>
          <FormLayout cardHeading={translate("outlets")}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_name_(english)")}
                  helperText={errors.itemName?.message}
                  error={Boolean(errors.itemName)}
                  placeholder={translate("enter_item_name")}
                />
              )}
            />
            <Controller
              control={control}
              name="itemNamePOS"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("item_short_name_on_pos_(english)")}
                  helperText={errors.itemNamePOS?.message}
                  error={Boolean(errors.itemNamePOS)}
                  placeholder={translate("enter_item_name_pos")}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("description")}
                  helperText={errors.description?.message}
                  error={Boolean(errors.description)}
                  placeholder={translate("enter_description")}
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
                  placeholder={translate("enter_pc/kg/gram")}
                />
              )}
            />

            <Controller
              control={control}
              name="item_category"
              render={({ field }) => (
                <SelectInput
                  {...field}
                  options={SelectGender}
                  placeholder={translate("select_item_category")}
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
                  placeholder={translate("enter_item_category")}
                />
              )}
            />
          </FormLayout>

          <Box>
            <FormLayout cardHeading={translate("availability")}>
              <DateInput
                id="Valid_From_Date"
                label={translate("Valid_From_Date")}
                error={errors.Valid_From_Date?.message}
              />

              <DateInput
                id="Valid_to_Date"
                label={translate("Valid_to_Date")}
                error={errors.Valid_to_Date?.message}
              />

              <Controller
                name="Valid_To_Time"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    label={translate("valid_to_time")}
                    options={SelectGender}
                    placeholder={translate("select_time")}
                    helperText={errors.Valid_To_Time?.message}
                    error={Boolean(errors.Valid_To_Time)}
                  />
                )}
              />
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
