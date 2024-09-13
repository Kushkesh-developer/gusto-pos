  "use client"
  import React from "react";
  import { useForm, SubmitHandler, Controller } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import * as z from "zod";
  import { Box, Stack } from "@mui/material";

  import SelectInput from "../widgets/inputs/GSSelectInput";
  import TextInput from "../widgets/inputs/GSTextInput";
  import { useLocalization } from "@/context/LocalizationProvider";
  import FormLayout from "../widgets/forms/GSFormCardLayout";
  import CustomButton from "../widgets/buttons/GSCustomButton";
  import ColorPicker from "../widgets/colorPicker/colorPicker";
  import GSSwitchButton from "../widgets/switch/GSSwitchButton";

  const GSTCategoryData = [
    { value: "category1", label: "Category 1" },
    { value: "category2", label: "Category 2" },
  ];

  const colorset1 = [
    { color: "#ed9f9f", border: "transparent" },
    { color: "#EDD79F", border: "transparent" },
    { color: "#B3ED9F", border: "transparent" },
    { color: "#9FE4ED", border: "transparent" },
    { color: "#9FA7ED", border: "transparent" },
    { color: "#E29FED", border: "transparent" },
    { color: "#DBDBDB", border: "transparent" },
  ];

  const colorset2 = [
    { color: "#000", border: "transparent" },
    { color: "#fff", border: " #B7B1B1" },
  ];

  const generateZodSchema = () => {
    return z.object({
      category_name: z.string().optional(),
      gst_category: z.string().optional(),
      category_order: z.string().optional(),
      service_charge: z.string().optional(),
      show_image_pos: z.boolean().optional(),
      show_image_web: z.boolean().optional(),
    });
  };

  const AddCategory = () => {
    const { translate } = useLocalization();
    const schema = generateZodSchema();

    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        category_name: "",
        gst_category: "",
        category_order: "",
        service_charge: "",
        show_image_pos: false,
        show_image_web: false,
      },
    });

    const onSubmit: SubmitHandler<any> = (data) => {
      console.log(data);
    };
    
    return (
      <Box
        sx={{
          maxWidth: "1140px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormLayout cardHeading={translate("new_category")}>
          
              <Controller
                control={control}
                name="category_name"
                render={({ field }) => (
                  <TextInput
                    {...field}
                    label={translate("category_name")}
                    helperText={errors.category_name?.message}
                    error={Boolean(errors.category_name)}
                    placeholder="Enter category Name"
                  />
                )}
              />
              
              <Controller
                name="gst_category"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    label={translate("gst")}
                    options={GSTCategoryData}
                    placeholder="Include GST"
                    helperText={errors.gst_category?.message}
                    error={Boolean(errors.gst_category)}
                  />
                )}
              />
            
              <Controller
                name="category_order"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    label={translate("category_order")}
                    options={GSTCategoryData}
                    placeholder="Category order on POS"
                    helperText={errors.category_order?.message}
                    error={Boolean(errors.category_order)}
                  />
                )}
              />
            
              <Controller
                name="service_charge"
                control={control}
                render={({ field }) => (
                  <SelectInput
                    {...field}
                    label={translate("service_charge")}
                    options={GSTCategoryData}
                    placeholder="Include Service Charge"
                    helperText={errors.service_charge?.message}
                    error={Boolean(errors.service_charge)}
                  />
                )}
              />
              
            <Stack direction="column" spacing={4} withoutGrid>
              <ColorPicker
                heading={translate("category_background_color")}
                colors={colorset1}
              />
              <ColorPicker
                heading={translate("category_background_color")}
                colors={colorset2}
              />
            </Stack>
            
            <Stack spacing={2} direction={{ md: 'column', xs: 'column' }} withoutGrid>
              <Controller
                name="show_image_pos"
                control={control}
                render={({ field }) => (
                  <GSSwitchButton
                    {...field}
                    label={translate("show_image_pos")}
                    labelPlacement="start"
                    sx={{ display: 'block', marginTop: '20px !important', marginLeft: 0 }}
                  />
                )}
              />
              <Controller
                name="show_image_web"
                control={control}
                render={({ field }) => (
                  <GSSwitchButton
                    {...field}
                    label={translate("show_image_web")}
                    labelPlacement="start"
                    sx={{ display: 'block', marginTop: '20px !important', marginLeft: 0 }}
                  />
                )}
              />
            </Stack>
        
          </FormLayout>
          <Box display="flex" justifyContent="flex-end" mt={3} mb={5}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
              {translate("cancel")}
            </CustomButton>

            <CustomButton variant="contained" type="submit">
              {translate("save")}
            </CustomButton>
          </Box>
        </form>
      </Box>
    );
  };

  export default AddCategory;
