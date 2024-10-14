import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { z } from "zod";
import { TranslateFn } from "@/types/localization-types";
import {  Typography, Button } from "@mui/material";
import GSSwitchButton from "../widgets/switch/GSSwitchButton";
import CustomStack from "../widgets/inputs/GSCustomstack";



type OutletDrawerProps={
    open:boolean;
    onClose:()=>void;
}

interface FormData{
    header:string;
    footer:string;
    showCustomerInfo:boolean;
    ShowComments:boolean;
    printOrders:boolean;
}
const generateZodSchema = (translate:TranslateFn) => {
    return z.object({
        Header: z.string().min(1,translate("header_text_is_must")),
        footer:z.string().min(1,translate("footer_text_is_required")),
        showCustomerInfo: z.string().optional(),
        ShowComments: z.string().optional(),
        printOrders: z.boolean().optional(),
    });
  };
export default function ReceiptDrawer(props:OutletDrawerProps){
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);
     const {
        handleSubmit,
        control,
        formState:{errors},
     }=useForm<FormData>({
        resolver:zodResolver(schema),
        defaultValues:{
            header:"",
            footer:"",
            showCustomerInfo:false,
            ShowComments:false,
            printOrders:false,
        }
     })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form submission, including the outlets data
        console.log(data); // Example of handling the data
    };
    return(
        <Drawer
        open={props.open}
        OnClose={props.onClose}
        anchor="right"
        sx={{
           "& .MuiDrawer-paper": { boxSizing: "border-box", width: "50%", p: 2 }, 
        }}
        >
            <Typography variant="h6">{translate("add_new_receipt")} </Typography>
           <Box mb={5}>
            <FormLayout cardHeading={translate("receipt_details")}>
            <Controller
                   control={control}
                   name="header"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("header")}
                    helperText={errors.header?.message}
                    error={Boolean(errors.header)}
                    placeholder={translate("header")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="footer"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("footer")}
                    helperText={errors.footer?.message}
                    error={Boolean(errors.footer)}
                    placeholder={translate("footer")}
                  />
                )}
                   />
                  
          <CustomStack direction={{ md: "column", xs: "column" }} spacing={2} withoutGrid>
            <Controller
              name="showCustomerInfo"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate("show_customer_info")}
                  labelPlacement="start"
                  sx={{
                    display: "block",
                    marginTop: "20px !important",
                    marginLeft: 0,
                  }}
                />
              )}
            />
            <Controller
              name="ShowComments"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate("show_comments")}
                  labelPlacement="start"
                  sx={{
                    display: "block",
                    marginTop: "20px !important",
                    marginLeft: 0,
                  }}
                />
              )}
            />
             <Controller
              name="printOrders"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate("print_orders")}
                  labelPlacement="start"
                  sx={{
                    display: "block",
                    marginTop: "20px !important",
                    marginLeft: 0,
                  }}
                />
              )}
            />
          </CustomStack>
        
                  
            </FormLayout>
           </Box>
           <Box
                   sx={{
                  display: "flex",
                  minWidth: "100%",
                 justifyContent: "flex-end",
                  mt: 2,
                   }}
                  >
                  <Button
                    variant="outlined"
                    sx={{ h: 10, w: 10, minWidth: 120 }}
                   onClick={props.onClose}
                    >
                  {translate("cancel")}
                 </Button>
               <Button
                    variant="contained"
                   sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
                   onClick={handleSubmit(onSubmit)}
                 >
                  {translate("save")}
               </Button>
            </Box>
        </Drawer>
     )
    
}