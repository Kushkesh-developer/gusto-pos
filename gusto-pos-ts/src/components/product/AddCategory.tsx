'use client';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';

import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import ColorPicker from '@/components/widgets/colorPicker/colorPicker';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStack from '@/components/widgets/inputs/GSCustomStack';

interface FormData {
  category_name?: string;
  gst_category?: string;
  category_order?: string;
  service_charge?: string;
  show_image_pos?: boolean;
  show_image_web?: boolean;
}
const GSTCategoryData = [
  { value: 'category1', label: 'Category 1' },
  { value: 'category2', label: 'Category 2' },
];

const colorset1 = [
  { color: '#ed9f9f', border: 'transparent' },
  { color: '#EDD79F', border: 'transparent' },
  { color: '#B3ED9F', border: 'transparent' },
  { color: '#9FE4ED', border: 'transparent' },
  { color: '#9FA7ED', border: 'transparent' },
  { color: '#E29FED', border: 'transparent' },
  { color: '#DBDBDB', border: 'transparent' },
];

const colorset2 = [
  { color: '#000', border: 'transparent' },
  { color: '#fff', border: ' #B7B1B1' },
];

const generateZodSchema = () => {
  return z.object({
    category_name: z.string().optional(),
    gst_category: z.string().optional(),
    category_order: z.string().optional(),
    service_charge: z.string().optional(),
    show_image_pos: z.boolean().optional(),
    show_image_web: z.boolean().optional(),
  });
};

const AddCategory = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      category_name: '',
      gst_category: '',
      category_order: '',
      service_charge: '',
      show_image_pos: false,
      show_image_web: false,
    },
  });

  const onSubmit: SubmitHandler<FormData> = () => {
    // eslint-disable-next-line no-console
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout cardHeading={translate('new_category')}>
          <Controller
            control={control}
            name="category_name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('category_name')}
                helperText={errors.category_name?.message}
                error={Boolean(errors.category_name)}
                placeholder={translate('enter_category_name')}
              />
            )}
          />

          <Controller
            name="gst_category"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('gst')}
                options={GSTCategoryData}
                placeholder={translate('include_gst')}
                helperText={errors.gst_category?.message}
                error={Boolean(errors.gst_category)}
              />
            )}
          />

          <Controller
            name="category_order"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('category_order')}
                options={GSTCategoryData}
                placeholder={translate('category_order_on_pos')}
                helperText={errors.category_order?.message}
                error={Boolean(errors.category_order)}
              />
            )}
          />

          <Controller
            name="service_charge"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('service_charge')}
                options={GSTCategoryData}
                placeholder={translate('include_service_charge')}
                helperText={errors.service_charge?.message}
                error={Boolean(errors.service_charge)}
              />
            )}
          />

          <GSCustomStack direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <ColorPicker heading={translate('category_background_color')} colors={colorset1} />
            <ColorPicker heading={translate('category_background_color')} colors={colorset2} />
          </GSCustomStack>

          <GSCustomStack direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="show_image_pos"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('show_image_pos')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />
            <Controller
              name="show_image_web"
              control={control}
              render={({ field }) => (
                <GSSwitchButton
                  {...field}
                  label={translate('show_image_web')}
                  labelPlacement="start"
                  sx={{
                    display: 'block',
                    marginTop: '20px !important',
                    marginLeft: 0,
                  }}
                />
              )}
            />
          </GSCustomStack>
        </FormLayout>
        <Box display="flex" justifyContent="flex-end" mt={3} mb={5}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }}>
            {translate('cancel')}
          </CustomButton>

          <CustomButton variant="contained" type="submit">
            {translate('save')}
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
};

export default AddCategory;
