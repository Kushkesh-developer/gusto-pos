"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Box } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../widgets/inputs/GSTextInput";
import { TranslateFn } from "@/types/localization-types";
import FormLayout from "../widgets/forms/GSFormCardLayout";
import { useLocalization } from "@/context/LocalizationProvider";
import CustomButton from "../widgets/buttons/GSCustomButton";

interface FormData {
  startingPrice: string;
  distance: string;
  priceAfterEveryKm: string;
  freeDeliveryAt: string;
  minimumPurchase: string;
  feeForFallingBelowMinimumPurchase: string;
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    startingPrice: z.string().min(1, translate("price_must_be_included")),
    distance: z.string().min(1, translate("distance_must_entered")),
    priceAfterEveryKm: z
      .string()
      .min(1, translate("please_enter_price_every_km")),
    freeDeliveryAt: z.string().min(1, translate("Free_delivery_must_be_$40")),
    minimumPurchase: z
      .string()
      .min(1, translate("minimum_purchase_must_be_$5")),
    feeForFallingBelowMinimumPurchase: z
      .string()
      .min(1, translate("please_enter_above_$2_otherWise_charge_may_apply")),
  });
};

const DeliveryCostForm = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      startingPrice: "",
      distance: "",
      priceAfterEveryKm: "",
      freeDeliveryAt: "",
      minimumPurchase: "",
      feeForFallingBelowMinimumPurchase: "",
    },
  });
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout
            cardHeading={translate("logistics_company")}
            showSwitch={true}
          >
            <Controller
              name="startingPrice"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("starting_price")}
                  placeholder={translate("starting_price")}
                  error={Boolean(errors.startingPrice)}
                  helperText={errors.startingPrice?.message}
                />
              )}
            />
            <Controller
              name="distance"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("distance")}
                  placeholder={translate("distance")}
                  error={Boolean(errors.distance)}
                  helperText={errors.distance?.message}
                />
              )}
            />
            <Controller
              name="priceAfterEveryKm"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("price_after_every_km")}
                  placeholder={translate("price_after_every_km")}
                  error={Boolean(errors.priceAfterEveryKm)}
                  helperText={errors.priceAfterEveryKm?.message}
                />
              )}
            />
            <Controller
              name="freeDeliveryAt"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("free_delivery_at")}
                  placeholder={translate("free_delivery_at")}
                  error={Boolean(errors.freeDeliveryAt)}
                  helperText={errors.freeDeliveryAt?.message}
                />
              )}
            />
            <Controller
              name="minimumPurchase"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("minimum_purchase")}
                  placeholder={translate("minimum_purchase")}
                  error={Boolean(errors.minimumPurchase)}
                  helperText={errors.minimumPurchase?.message}
                />
              )}
            />
            <Controller
              name="feeForFallingBelowMinimumPurchase"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  label={translate("fee_for_falling_below_minimum_purchase")}
                  placeholder={translate(
                    "fee_for_falling_below_minimum_purchase"
                  )}
                  error={Boolean(errors.feeForFallingBelowMinimumPurchase)}
                  helperText={errors.feeForFallingBelowMinimumPurchase?.message}
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

export default DeliveryCostForm;
