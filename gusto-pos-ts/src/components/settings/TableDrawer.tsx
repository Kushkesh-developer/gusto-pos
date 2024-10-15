import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import React,{useState} from "react";
import FormLayout from "@/components/widgets/forms/GSFormCardLayout";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { z } from "zod";
import { TranslateFn } from "@/types/localization-types";
import {  Typography, Button } from "@mui/material";
import SelectInput from "../widgets/inputs/GSSelectInput";
import GSImageUpload from "../widgets/image/GSImageUpload";

 const OutletSelect=[
    {value:"category1",label:"category1"},
    { value: "Category2", label: "Category 2" },
 ]
 const SelectFloor=[
    {value:"Floor Q",label:"Floor Q"},
    { value:"Floor k",label:"Floor k"}
 ]

type OutletDrawerProps={
    open:boolean;
    onClose:()=>void;
}
 interface FormData{
       selectFloor:string;
      tableName:string;
       seats:string;
       outlet:string;
       link:string;
       logo_image:string;
 }

 const generateZodSchema=(translate:TranslateFn)=>{
     return z.object({
        selectFloor:z.string().min(1,translate("select_floor_is_required")),
        tableName:z.string().min(1,translate("table_name_is_required")),
        outlet:z.string().min(1,translate("outlet_is_required")),
         seat:z.string().min(1,translate("seat_is_required")),
         link:z.string().min(1,translate("link_is_required")),
     })
 }

 export default function TerminalDrawer(props:OutletDrawerProps){
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);
    const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);
     const {
        handleSubmit,
        control,
        formState:{errors},
        setValue
     }=useForm<FormData>({
        resolver:zodResolver(schema),
        defaultValues:{
            selectFloor:"",
            tableName:"",
            outlet:"",
            seats:"",
            link:""
        }
     })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        // Handle form submission, including the outlets data
        console.log(data); // Example of handling the data
    };
         
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              const imgData = reader.result as string;
              setSelectedImg(imgData);
              setValue("logo_image", imgData); // Set the image data in the form
          };
          reader.readAsDataURL(file);
      }
  };

  const handleRemoveImage = () => {
      setSelectedImg(undefined);
      setValue("logo_image", ""); // Clear the slider_image value in the form
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
            <Typography variant="h6">{translate("add_new_terminal")} </Typography>
           <Box mb={5}>
            <FormLayout cardHeading={translate("terminal_details")}>
                      
            <Controller
                   control={control}
                   name="tableName"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("table_name")}
                    helperText={errors.tableName?.message}
                    error={Boolean(errors.tableName)}
                    placeholder={translate("table_name")}
                  />
                )}
                   />
                       <Controller
                   control={control}
                   name="seats"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("seats")}
                    helperText={errors.seats?.message}
                    error={Boolean(errors.seats)}
                    placeholder={translate("seats")}
                  />
                )}/>
                <GSImageUpload
                         name="logo_image"
                         selectedImg={selectedImg}
                        onClick={handleRemoveImage}
                        quantity={false}
                        errors={{ slider_image: errors.logo_image?.message }}
                        touched={{}} // You can manage touched state if necessary
                        category={false}
                        onChange={(event :React.ChangeEvent<HTMLInputElement> ) => handleImageUpload(event)}  />
                          <Controller
                   control={control}
                   name="link"
                   render={({field})=>(
                    <TextInput
                    {...field}
                    label={translate("link")}
                    helperText={errors.link?.message}
                    error={Boolean(errors.link)}
                    placeholder={translate("link")}
                  />
                )}
                 
                   />
                       <Controller
                   control={control}
                   name="outlet"
                   render={({field})=>(
                    <SelectInput
                    {...field}
                    options={OutletSelect}
                    label={translate("outlet")}
                    helperText={errors.outlet?.message}
                    error={Boolean(errors.outlet)}
                    placeholder={translate("outlet")}
                  />
                )}
                   />
                         <Controller
                   control={control}
                   name="selectFloor"
                   render={({field})=>(
                    <SelectInput
                    {...field}
                    options={OutletSelect}
                    label={translate("select_floor")}
                    helperText={errors.selectFloor?.message}
                    error={Boolean(errors.selectFloor)}
                    placeholder={translate("select_floor")}
                  />
                )}
                   /><GSImageUpload
                   name="logo_image"
                   selectedImg={selectedImg}
                  onClick={handleRemoveImage}
                  quantity={false}
                  errors={{ slider_image: errors.logo_image?.message }}
                  touched={{}} // You can manage touched state if necessary
                  category={false}
                  onChange={(event :React.ChangeEvent<HTMLInputElement> ) => handleImageUpload(event)}  />
                  
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
 