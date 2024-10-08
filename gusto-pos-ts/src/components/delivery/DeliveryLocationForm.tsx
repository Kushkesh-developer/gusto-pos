"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Box } from "@mui/material";
import TextInput from "../widgets/inputs/GSTextInput";
import { TranslateFn } from "@/types/localization-types";
import { useLocalization } from "@/context/LocalizationProvider";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import CustomButton from "../widgets/buttons/GSCustomButton";

interface FormData {
    Location: string;
    DeliveryCost: number;
}

const generateZodSchema = (translate: TranslateFn) => {
    return z.object({
        Location: z.string().min(1, translate("location_must_be_entered")),
        DeliveryCost: z.number().min(2, { message: translate("minimum_delivery_cost is more than $10 dollar") }),
    });
};

const DeliveryLocationForm = () => {
    const { translate } = useLocalization();
    const schema = generateZodSchema(translate);

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            Location: "",
            DeliveryCost: 0,
        }
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
    };

    return (
        <Box sx={{ maxWidth: "1140px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box mb={5}>
                    <FormLayout cardHeading={translate("Location details")}>
                        <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" // Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                             <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" // Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                             <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" // Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                             <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" // Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                             <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" // Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                             <Controller
                            name="Location"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Location")}
                                    error={Boolean(errors.Location)}
                                    helperText={errors.Location?.message}
                                />
                            )}
                        />
                        <Controller
                            name="DeliveryCost"
                            control={control}
                            render={({ field }) => (
                                <TextInput
                                    {...field}
                                    label={translate("Delivery Cost")}
                                    type="number" //sir i build these files together  Make sure the input type is set to number
                                    error={Boolean(errors.DeliveryCost)}
                                    helperText={errors.DeliveryCost?.message}
                                />
                            )}
                        />
                    </FormLayout>
                    <Box display="flex" justifyContent="flex-end" mt={3}>
                        <CustomButton variant="contained" type="button" sx={{ mr: 2 }}>
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

export default DeliveryLocationForm;
