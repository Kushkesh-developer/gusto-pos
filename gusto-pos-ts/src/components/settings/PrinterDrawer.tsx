import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import Checkbox from '@mui/material/Checkbox';
import { z } from "zod";
import FormGroup from '@mui/material/FormGroup';
import { TranslateFn } from "@/types/localization-types";
import { FormControlLabel, Typography, Button } from "@mui/material";


type OutletDrawerProps={
    open:boolean;
    onClose:()=>void;
}
 interface FormData{
     printername:string;
     printerType:string;
     printerModel:string;
     printerIPaddress:string;
     receiptQuantity:string;
     details:{
      printReceiptandbills:boolean;
      printorders:boolean;
     }
     
 }

 const generateZodSchema=(translate:TranslateFn)=>{
     return z.object({
      printername:z.string().min(1,translate("printer_name_is_required")),
      printerType:z.string().min(1,translate("printer_type_is_required")),
      printerModel:z.string().min(1,translate("print_model_is_required")),
      printerIPaddress:z.string().min(1,translate("print_ip_is_required")),
      receiptQuantity:z.string().min(1,translate("receipe_quantity_is_required")),
        details:z.record(z.boolean())
     })
 }

 export default function OutletDrawer(props:OutletDrawerProps){
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);
     const {
        handleSubmit,
        control,
        formState:{errors},
     }=useForm<FormData>({
        resolver:zodResolver(schema),
        defaultValues:{
         printername:"",
         printerType:"",
         printerModel:"",
         printerIPaddress:"",
         receiptQuantity:"",
         details:{
            printReceiptandbills:false,
            printorders:false,
         }
     
        }
     })

    const onSubmit: SubmitHandler<FormData> = () => {
       
    };
     return(
        <Drawer
        open={props.open}
        onClose={props.onClose}
        anchor="right"
        sx={{
           "& .MuiDrawer-paper": { boxSizing: "border-box", width: "50%", p: 2 }, 
        }}
        >
            <Typography variant="h6">{translate("add_new_printer")} </Typography>
           <Box mb={5}>
            <FormLayout cardHeading={translate("printer_details")}>
            <Controller
                   control={control}
                   name="printername"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("printer_name")}
                    helperText={errors.printername?.message}
                    error={Boolean(errors.printername)}
                    placeholder={translate("printer_name")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="printerType"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("printer_type")}
                    helperText={errors.printerType?.message}
                    error={Boolean(errors.printerType)}
                    placeholder={translate("printer_type")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="printerModel"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("printer_model")}
                    helperText={errors.printerModel?.message}
                    error={Boolean(errors.printerModel)}
                    placeholder={translate("printer_model")}
                  />
                )}
                   />    label=""
                       <Controller
                   control={control}
                   name="printerIPaddress"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("printer_ip_address")}
                    helperText={errors.printerIPaddress?.message}
                    error={Boolean(errors.printerIPaddress)}
                    placeholder={translate("printer_ip_address")}
                  />
                )}
                   />
                         <Controller
                   control={control}
                   name="receiptQuantity"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("receipt_quantity")}
                    helperText={errors.receiptQuantity?.message}
                    error={Boolean(errors.receiptQuantity)}
                    placeholder={translate("receipt_quantity")}
                  />
                )}
                   />
                   <Controller
                      name="details.printReceiptandbills"
                      control={control}
                     render={({ field }) => (
                     <FormGroup>
                        <FormControlLabel
                         control={
                           <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          />
                         }
                    label={translate("print_receipe_and_bills")}
                  />
                </FormGroup>
              )}
            />
                  <Controller
                      name="details.printorders"
                      control={control}
                     render={({ field }) => (
                     <FormGroup>
                        <FormControlLabel
                         control={
                           <Checkbox
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          />
                         }
                         label={translate("print_orders")}
                  />
                </FormGroup>
              )}
            />
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
 