"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Box } from "@mui/material";
import dayjs from "dayjs";
import SelectInput from "../widgets/inputs/GSSelectInput";
import DateInput from "../widgets/inputs/GSDateInput";
import TextInput from "../widgets/inputs/GSTextInput";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";
import { TranslateFn } from "@/types/localization-types";
import { timeSlots } from "@/mock/discount";
import GSImageUpload from "../widgets/image/GSImageUpload";

interface FormData {
    ads_provider_name: string;
    order: string;
    refresh_rate: string;
    valid_to_date_optional: Date;
    valid_from_date_optional: Date;
    slider_image: string; // Add this line to ensure slider_image is part of FormData
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
    return z.object({
        ads_provider_name: z.string().min(1, translate("ads_provider_name_required")),
        order: z.string().min(1, translate("order_required")),
        refresh_rate: z.string().min(1, translate("refresh_rate_required")),
        valid_from_date_optional: z.date().max(new Date(), translate("valid_from_date_optional_required")),
        valid_to_date_optional: z.date().max(new Date(), translate("valid_to_date_optional_required")),
        slider_image: z.string().min(1, translate("slider_image_required")), // Ensure slider_image validation
    });
};

const AddSlider = () => {
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);
    const [selectedImg, setSelectedImg] = useState<string | undefined>(undefined);

    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue, // To set the slider_image value in the form
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            ads_provider_name: "",
            order: "",
            refresh_rate: "",
            valid_to_date_optional: dayjs().toDate(),
            valid_from_date_optional: dayjs().toDate(),
            slider_image: "",
        },
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgData = reader.result as string;
                setSelectedImg(imgData);
                setValue("slider_image", imgData); // Set the image data in the form
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImg(undefined);
        setValue("slider_image", ""); // Clear the slider_image value in the form
    };

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        console.log(data);
        // Implement your submit logic here
    };

    return (
        <Box sx={{ maxWidth: "1140px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={5}>
                    <FormLayout cardHeading={translate("advertisement_details")}>
                        <Controller
                            control={control}
                            name="ads_provider_name"
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("ads_provider_name")}
                                    helperText={errors.ads_provider_name?.message}
                                    error={Boolean(errors.ads_provider_name)}
                                    placeholder={translate("ads_provider_name")}
                                />
                            )}
                        />
                        <Controller
                            name="order"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    label={translate("order")}
                                    options={timeSlots}
                                    placeholder={translate("order")}
                                />
                            )}
                        />
                        <Controller
                            name="valid_from_date_optional"
                            control={control}
                            render={({ field }) => (
                                <DateInput
                                    id="valid_from_date_optional"
                                    {...field}
                                    label={translate("valid_from_date_optional")}
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        />
                        <Controller
                            name="valid_to_date_optional"
                            control={control}
                            render={({ field }) => (
                                <DateInput
                                    id="valid_to_date_optional"
                                    {...field}
                                    label={translate("valid_to_date_optional")}
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                />
                            )}
                        />
                        <Controller
                            name="refresh_rate"
                            control={control}
                            render={({ field }) => (
                                <SelectInput
                                    {...field}
                                    label={translate("refresh_rate")}
                                    options={timeSlots}
                                    placeholder={translate("refresh_rate")}
                                />
                            )}
                        />
                    </FormLayout>
                    <FormLayout cardHeading={translate("upload_image")}>
                        <GSImageUpload
                            name="slider_image"
                            selectedImg={selectedImg}
                            onClick={handleRemoveImage}
                            quantity={false}
                            errors={{ slider_image: errors.slider_image?.message }}
                            touched={{}} // You can manage touched state if necessary
                            imagelabel={translate("upload_image")}
                            category={false}
                            onChange={(event :React.ChangeEvent<HTMLInputElement> ) => handleImageUpload(event)}                        />
                    </FormLayout>
                </Box>
                <Box mb={5}>
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

export default AddSlider;
