"use client";
import React,{useState} from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box,  } from "@mui/material";

import SelectInput from "../widgets/inputs/GSSelectInput";
import TextInput from "../widgets/inputs/GSTextInput";
import DateInput from "../widgets/inputs/GSDateInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import GSSwitchButton from "../widgets/switch/GSSwitchButton";
interface FormData {
    itemName: string;
    itemNamePOS: string;
    description: string;
    unit: string;
    item_category: string;
    product_sKU_barcode: string;
    chineseName1:string;
    chineseName2:string;
    chineseName3:string;
  // ... other fields
}
// Zod schema generation function with localized error messages
const generateZodSchema = (translate: any) => {
  return z.object({
    itemName: z.string().min(1, translate("itemName_required")),
    itemNamePOS: z.string().min(1, translate("item_short_name_on_pOS_( English )_required")),
    description: z.string().min(1, translate("description_required")),
    unit: z.string().email(translate("unit_required")),
    item_category: z.string().min(1, translate("item_category_required")),
    product_sKU_barcode: z.string().min(1, translate("product_sKU_barcode_required")),
   
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
        chineseName1:"",
        chineseName2:"",
        chineseName3:"",
    
     
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
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
      <Box sx={{width:"100%"}}>
        <GSSwitchButton
          checked={showTextFields}
          onChange={handleToggleChange}
          label="Add Chinese name :"
          labelPlacement="start"
        />
        {showTextFields && (
          <Box mt={2}  sx={{ width: "49%" }} mb={3}>
            <Controller
              control={control}
              name="chineseName1"
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate('Chinese Name 1')}
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
                  label={translate('Chinese Name 2')}
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
                  label={translate('Chinese Name 3')}
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
        <Box mb={5}>
        <FormLayout cardHeading={translate("Item_detail")}><>Content</></FormLayout>
        <FormLayout cardHeading={translate("Item_detail")}><>Content</></FormLayout>
        <FormLayout cardHeading={translate("Item_detail")}><>Content</></FormLayout>
        <FormLayout cardHeading={translate("Item_detail")}><>Content</></FormLayout>
        <FormLayout cardHeading={translate("Item_detail")}><>Content</></FormLayout>
          {/* <FormLayout cardHeading={translate("additional_information")}>
            <React.Fragment>
              <DateInput
                id="dateOfBirth"
                label={translate("date_of_birth")}
                register={register}
                error={errors.dateOfBirth?.message}
              />
             
               
               <Controller
               name="maritalStatus"
               control={control}
                render={({ field }) => (
                  <SelectInput
                  {...field}
                  label={translate("marital_status")}
                  options={SelectGender}
                  placeholder="Select maritalStatus"
                  helperText={errors.maritalStatus?.message}
                  error={Boolean(errors.maritalStatus)}
                />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="nationality"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("nationality")}
                    helperText={errors.nationality?.message}
                    error={Boolean(errors.nationality)}
                    placeholder="Enter Nationality"
                  />
                )}
              />

              <Controller
                control={control}
                name="facebook"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("facebook")}
                    helperText={errors.facebook?.message}
                    error={Boolean(errors.facebook)}
                    placeholder="Enter Facebook"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="linkedIn"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("linkedIn")}
                    helperText={errors.linkedIn?.message}
                    error={Boolean(errors.linkedIn)}
                    placeholder="Enter LinkedIn"
                  />
                )}
              />
              <Controller
                control={control}
                name="twitter"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("twitter")}
                    helperText={errors.twitter?.message}
                    error={Boolean(errors.twitter)}
                    placeholder="Enter Twitter"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("address")}
                    helperText={errors.address?.message}
                    error={Boolean(errors.address)}
                    placeholder="Enter Address"
                  />
                )}
              />
              <Controller
                control={control}
                name="numberOfPurchases"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("number_of_purchases")}
                    helperText={errors.numberOfPurchases?.message}
                    error={Boolean(errors.numberOfPurchases)}
                    placeholder="Enter numberOfPurchases"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="lowestSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("lowest_spend")}
                    helperText={errors.lowestSpend?.message}
                    error={Boolean(errors.lowestSpend)}
                    placeholder="Enter LowestSpend"
                  />
                )}
              />
              <Controller
                control={control}
                name="highestSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("highest_spend")}
                    helperText={errors.highestSpend?.message}
                    error={Boolean(errors.highestSpend)}
                    placeholder="Enter HighestSpend"
                  />
                )}
              />
            </React.Fragment>
            <React.Fragment>
              <Controller
                control={control}
                name="avgSpend"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("average_spend")}
                    helperText={errors.avgSpend?.message}
                    error={Boolean(errors.avgSpend)}
                    placeholder="Enter AvgSpend"
                  />
                )}
              />
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("note")}
                    helperText={errors.note?.message}
                    error={Boolean(errors.note)}
                    placeholder="Enter Note"
                  />
                )}
              />
            </React.Fragment>
          </FormLayout> */}

          <Box display="flex" justifyContent="flex-end" mt={3}>
          <CustomButton
        variant="outlined"
        type="button"
       
        sx={{ mr: 2 }}
      >
        {translate("cancel")}
      </CustomButton>

      <CustomButton
        variant="contained"
        type="submit"
        
      >
        {translate("save")}
      </CustomButton>
          </Box>
        </Box>
        
      </form>
    </Box>
  );
};

export default AddProductItem;
