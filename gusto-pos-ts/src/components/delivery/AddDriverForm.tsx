"use client"
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Box } from "@mui/material";
import TextInput from "../widgets/inputs/GSTextInput";
import { TranslateFn } from "@/types/localization-types";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import DateInput from "../widgets/inputs/GSDateInput";
import SelectInput from "../widgets/inputs/GSSelectInput";
import CustomButton from "../widgets/buttons/GSCustomButton";

interface FormData{
    prefix:string;
    driverName:string;
    phoneNumber: string;
    email: string;
    driverLocation:string;
    dateOfBirth: Date;
    maritalStatus: string;
    nationality: string;
    facebook: string;
    linkedIn: string;
    twitter: string;
    address: string;
}

const generateZodSchema=(translate:TranslateFn)=>{
    return z.object({
        prefix:z.string().min(1,translate("prefix_must_be_there")),
        driverName:z.string().min(1,translate("driver_name_must_be_there")),
        phoneNumber: z.string().min(1, translate("phone_number_required")),
        email: z.string().email(translate("invalid_email")),
        driverLocation:z.string().email(translate("driver_location_is_required")),
        dateOfBirth: z.date().max(new Date(), translate("date_of_birth_past")),
        maritalStatus: z.string().min(1, translate("marital_status_required")),
        nationality: z.string().min(1, translate("nationality_required")),
        facebook: z.string().optional(),
        linkedIn: z.string().optional(),
        twitter: z.string().optional(),
        address: z.string().min(1, translate("address_required")),

        
    })
}
 const AddDriverForm=()=>{
    const{translate}=useLocalization();
    const schema=generateZodSchema(translate);

    const{
        control,
        handleSubmit,
        formState:{errors}
    }=useForm<FormData>({
        defaultValues:{
            prefix:"",
            driverName:"",
            phoneNumber: "",
            email: "",
            driverLocation:"",
            dateOfBirth: new Date(),
           maritalStatus: "",
           nationality: "",
          facebook: "",
         linkedIn: "",
         twitter: "",
         address: "",
        },
    });
    
     const onSubmit:SubmitHandler<FormData>=(data)=>{
        // eslint-disable-next-line no-console
          console.log(data);
     };
      return(
        <Box sx={{maxWidth:"1140px"}}> 
          <form onSubmit={handleSubmit(onSubmit)}>
         <Box mb={5}>
            <FormLayout cardHeading={translate("add_drivers")}>
                <Controller
                  name="prefix"
                  control={control}
                  render={({field})=>(
                    <TextInput
                     {...field}
                     label={translate("add_prefix")}
                     helperText={errors.prefix?.message}
                     error={Boolean(errors.prefix)}
                     placeholder={translate("mr/mrs/ms")}
                      
                    />
                  )}
                />
                <Controller
                  name="driverName"
                  control={control}
                  render={({field})=>(
                    <TextInput
                     {...field}
                     label={translate("driver_name")}
                     helperText={errors.driverName?.message}
                     error={Boolean(errors.prefix)}
                     placeholder={translate("driver_name")}
                    />
                  )}
                />
                  <Controller
                   name="phoneNumber"
                    control={control}
                   render={({ field }) => (
                   <TextInput
                    {...field}
                     label={translate("phone_number")}
                     helperText={errors.phoneNumber?.message}
                    error={Boolean(errors.phoneNumber)}
                    placeholder={translate("enter_phone_number")}
                />
              )}
            />
             <Controller
                 name="email"
                control={control}
                render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("email")}
                  helperText={errors.email?.message}
                  error={Boolean(errors.email)}
                  placeholder={translate("enter_email")}
                />
              )}
            />
              <Controller
                 name="driverLocation"
                control={control}
                render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("driver_location")}
                  helperText={errors.email?.message}
                  error={Boolean(errors.email)}
                  placeholder={translate("driver_location")}
                />
              )}
            />
            </FormLayout>
            
            <Box mb={5}>
          <FormLayout cardHeading={translate("additional_information")}>
            <DateInput
              id="dateOfBirth"
              label={translate("date_of_birth")}
              // register={register}
              error={errors.dateOfBirth?.message}
            />
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <SelectInput
                  {...field}
                  label={translate("marital_status")}
                  options={[
                    { value: "Male", label: "Male" },
                    { value: "Female", label: "Female" },
                    { value: "Other", label: "Other" },
                  ]}
                  placeholder={translate("select_marital_status")}
                  helperText={errors.maritalStatus?.message}
                  error={Boolean(errors.maritalStatus)}
                />
              )}
            />
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("nationality")}
                  helperText={errors.nationality?.message}
                  error={Boolean(errors.nationality)}
                  placeholder={translate("enter_nationality")}
                />
              )}
            />
            <Controller
              name="facebook"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("facebook")}
                  helperText={errors.facebook?.message}
                  error={Boolean(errors.facebook)}
                  placeholder={translate("enter_facebook")}
                />
              )}
            />
              <Controller
              name="LinkedIn"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("LinkedIn")}
                  helperText={errors.linkedIn?.message}
                  error={Boolean(errors.linkedIn)}
                  placeholder={translate("enter_linkedIn")}
                />
              )}
            />
           
          </FormLayout>
        </Box>
         </Box>
        </form>
         </Box>
      )

    }
 export default AddDriverForm