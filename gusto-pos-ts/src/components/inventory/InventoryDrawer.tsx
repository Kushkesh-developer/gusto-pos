import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { FormControlLabel, Typography, Button } from '@mui/material';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

type InventoryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

interface FormData {
  itemName: string;
  itemSkuCode: string;
  barCodeType: string;
  unit: string;
  expirydate: Date;
  alertQuantity: string;
  outlets: {
    outlet1: boolean; // Explicit outlet name
    outlet2: boolean; // Explicit outlet name
    // Add more outlets here if needed
  };
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    itemName: z.string().min(1, translate('enter_product_name')),
    itemSkuCode: z.string().min(1, translate('enter_the_code')),
    barCodeType: z.string().min(1, translate('select_the_barcode')),
    unit: z.string().min(1, translate('enter_value_in_the_Pc/KG/Gram')),
    expirydate: z.string().min(1, translate('expiry_is_required')),
    alertQuantity: z.string().min(1, translate('enter_quantity')),
    outlets: z.record(z.boolean()),
  });
};
export default function InventoryDrawer(props: InventoryDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: '',
      itemSkuCode: '',
      barCodeType: '',
      unit: '',
      expirydate: new Date(),
      alertQuantity: '',
      outlets: {
        outlet1: false,
        outlet2: false,
      },
    },
  });
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };
  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      <Typography variant="h6">{translate('add_new_inventory')} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate('basic_information')}>
          <Controller
            control={control}
            name="itemName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('item_name')}
                helperText={errors.itemName?.message}
                error={Boolean(errors.itemName)}
                placeholder={translate('item_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="itemSkuCode"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('item_sku_code')}
                helperText={errors.itemSkuCode?.message}
                error={Boolean(errors.itemSkuCode)}
                placeholder={translate('item_sku_code')}
              />
            )}
          />
          <Controller
            control={control}
            name="barCodeType"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('bar_code_type')}
                options={[
                  { value: 'hot meat', label: 'hot meat' },
                  { value: 'cold meat', label: 'cold meat' },
                ]}
                helperText={errors.barCodeType?.message}
                error={Boolean(errors.barCodeType)}
                placeholder={translate('bar_code_type')}
              />
            )}
          />
        </FormLayout>
      </Box>
      <Box mb={5}>
        <FormLayout cardHeading={translate('stock_management')} showSwitch={true}>
          <GSDateInput
            id="expirydate"
            label={translate('expiry_date')}
            // register={register}
            error={errors.expirydate?.message}
          />
          <Controller
            control={control}
            name="alertQuantity"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('alter_quantity')}
                helperText={errors.alertQuantity?.message}
                error={Boolean(errors.alertQuantity)}
                placeholder={translate('alter_quantity')}
              />
            )}
          />
        </FormLayout>
      </Box>
      <Box mb={5}>
        <FormLayout cardHeading={translate('Apply to these Outlets')}>
          <Controller
            name="outlets.outlet1"
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
                  label={translate('outlet')}
                />
              </FormGroup>
            )}
          />
          <Controller
            name="outlets.outlet2"
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
                  label={translate('outlet')}
                />
              </FormGroup>
            )}
          />
        </FormLayout>
      </Box>

      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={props.onClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {translate('save')}
        </Button>
      </Box>
    </Drawer>
  );
}
