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
import { FormControlLabel, Typography, Button } from "@mui/material";


type OutletDrawerProps={
    open:boolean;
    onClose:()=>void;
}
 interface FormData{
      outletId:string;
      outletName:string;
      address:string;
      postalcode:string;
      phone:string;
 }

 const generateZodSchema=(translate:TranslateFn)=>{
     return z.object({
        OutletId:z.string().min(1,translate("outlet_is_required")),
        outletName:z.string().min(1,translate("outlet_name_is_required")),
         address:z.string().min(1,translate("address_is_required")),
         postalcode:z.string().min(1,translate("postal_is_required")),
         phone:z.string().min(1,translate("phone_number_is_required"))
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
            outletId:"",
            outletName:"",
           address:"",
           postalcode:"",
           phone:""
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
            <Typography variant="h6">{translate("add_new_outlet")} </Typography>
           <Box mb={5}>
            <FormLayout cardHeading={translate("outlet_details")}>
            <Controller
                   control={control}
                   name="outletId"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("outlet_id")}
                    helperText={errors.outletId?.message}
                    error={Boolean(errors.outletId)}
                    placeholder={translate("outlet_id")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="outletName"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("outlet_name")}
                    helperText={errors.outletName?.message}
                    error={Boolean(errors.outletName)}
                    placeholder={translate("outlet_name")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="address"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("address")}
                    helperText={errors.address?.message}
                    error={Boolean(errors.address)}
                    placeholder={translate("address")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="postalcode"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("postal_code")}
                    helperText={errors.postalcode?.message}
                    error={Boolean(errors.postalcode)}
                    placeholder={translate("postal_code")}
                  />
                )}
                   />
                         <Controller
                   control={control}
                   name="phone"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("phone")}
                    helperText={errors.postalcode?.message}
                    error={Boolean(errors.postalcode)}
                    placeholder={translate("phone")}
                  />
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
 