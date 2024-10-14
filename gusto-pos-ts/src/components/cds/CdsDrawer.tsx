import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { z } from "zod";
import DateInput from "../widgets/inputs/GSDateInput";
import dayjs, { Dayjs } from "dayjs";
import { TranslateFn } from "@/types/localization-types";
import { Typography, Button } from "@mui/material";

type OutletDrawerProps={
    open:boolean;
    onClose:()=>void;
}

interface FormData{
    adsProvidername:string;
    order:string;
    ValidFromDate: Dayjs; // Changed to Dayjs for consistency
    ValidToDate: Dayjs; // C
     refreshrate:string;
}
const generateZodSchema = (translate: TranslateFn) => {
    return z.object({
    adsProvidename: z.string().min(1, translate("add_provider_name_is_required")),
    ValidFromDate: z.date().max(new Date(), translate("valid_from_date")),
    ValidToDate: z.date().max(new Date(), translate("valid_to_date")),
    refreshrate:z.string().min(1, translate("refresh_rate_is_required")),

})

}
export default function CdsDrawer(props:OutletDrawerProps){
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);
     const {
        handleSubmit,
        control,
        formState:{errors},
     }=useForm<FormData>({
        resolver:zodResolver(schema),
        defaultValues:{
        adsProvidername:"",
        refreshrate:"",
        ValidFromDate: dayjs(),
        ValidToDate: dayjs(),
        
     
        }
     })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form submission, including the outlets data
        console.log(data); // Example of handling the data
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
            <Typography variant="h6">{translate("add_new_ads")} </Typography>
           <Box mb={5}>
            <FormLayout cardHeading={translate("ads_details")}>
            <Controller
                   control={control}
                   name="adsProvidername"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("ads_provider")}
                    helperText={errors.adsProvidername?.message}
                    error={Boolean(errors.adsProvidername)}
                    placeholder={translate("ads_provider")}
                  />
                )}
                   />
                   <Controller
                   control={control}
                   name="refreshrate"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("refresh_rate")}
                    helperText={errors.adsProvidername?.message}
                    error={Boolean(errors.adsProvidername)}
                    placeholder={translate("refresh_rate")}
                  />
                )}
                   />
                       <Controller
                        name="ValidFromDate"
                          control={control}
                       render={({ field }) => (
                       <DateInput
                          id="valid_from_date"
                          {...field}
                        label={translate("valid_from_date")}
                         value={field.value}
                         onChange={(date) => field.onChange(date)}
                
                />
              )}
            />
            <Controller
              name="ValidToDate"
              control={control}
              render={({ field }) => (
                <DateInput
                  id="valid_to_date"
                  {...field}
                  label={translate("valid_to_date")}
                  value={field.value}p
                  onChange={(date) => field.onChange(date)}
                 
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