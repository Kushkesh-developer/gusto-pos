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
import { FormControlLabel, Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useDrawerContext } from '@/context/DrawerProvider';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { outlets } from '@/mock/common';
// Define outlets
// Dynamically define FormData based on outlets
interface FormData {
  itemName: string;
  itemSkuCode: string;
  barCodeType: string;
  unit: string;
  alertQuantity: string;
  outlets: {
    [key: string]: boolean; // This will accommodate all outlet keys dynamically
  };
}

type InventoryDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    itemName: z.string().min(1, translate('enter_product_name')),
    itemSkuCode: z.string().min(1, translate('enter_the_code')),
    barCodeType: z.string().min(1, translate('select_the_barcode')),
    unit: z.string().min(1, translate('enter_value_in_the_Pc/KG/Gram')),
    alertQuantity: z.string().min(1, translate('enter_quantity')),
    outlets: z.record(z.boolean()),
  });
};

export default function InventoryDrawer(props: InventoryDrawerProps) {
  const { translate } = useLocalization();
  const { drawerPosition } = useDrawerContext();
  const schema = generateZodSchema(translate);

  // Dynamically create defaultValues based on outlets
  const defaultValues = {
    itemName: '',
    itemSkuCode: '',
    barCodeType: '',
    unit: '',
    alertQuantity: '',
    outlets: outlets.reduce(
      (acc, outlet) => {
        acc[outlet.value] = false; // Set initial value for each outlet as false
        return acc;
      },
      {} as Record<string, boolean>,
    ),
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    console.log(data);
  };

  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    props.onClose();
  };

  return (
    <Drawer
      open={props.open}
      onClose={handleClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <PageHeader
        title={translate('add_new_inventory')}
        hideSearch={true}
        onClose={handleClose}
        showMobileView={true}
      />
      <Box mb={5}>
        <FormLayout cardHeading={translate('basic_information')}>
          <Controller
            control={control}
            name="itemName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
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
                requiredMark
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
                requiredMark
                label={translate('bar_code_type')}
                options={[
                  { value: 'wheatFloor', label: 'Wheat Floor' },
                  { value: 'cheese', label: 'Cheese' },
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
          <Controller
            control={control}
            name="alertQuantity"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
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
        <FormLayout cardHeading={translate('apply_to_these_outlet')}>
          {outlets.map((outlet) => (
            <Controller
              key={outlet.value}
              name={`outlets.${outlet.value}`}
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
                    label={translate(outlet.label)}
                  />
                </FormGroup>
              )}
            />
          ))}
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
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
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
