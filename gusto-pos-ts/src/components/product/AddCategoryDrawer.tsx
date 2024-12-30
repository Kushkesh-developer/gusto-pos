import Drawer from '@mui/material/Drawer';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import ColorPicker from '@/components/widgets/colorPicker/colorPicker';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { UserRecord } from '@/types/table-types';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import { useDrawerContext } from '@/context/DrawerProvider';
import { GSTCategoryData, CategoryOrder } from '@/mock/products';
type EditType = {
  id?: string | number;
  name?: string;
  [key: string]: unknown;
  itemName?: string;
  showOnPos?: boolean | string;
  showOnWeb?: boolean | string;
  logoImage?: string;
};
type CategoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<EditType | null>>;
};
interface FormData {
  itemName?: string;
  logoImage?: string;
  gstCategory?: string;
  categoryOrder?: string;
  serviceCharge?: string;
  showOnPos?: boolean;
  showOnWeb?: boolean;
}
const colorset1 = [
  { color: '#ed9f9f', border: 'transparent' },
  { color: '#EDD79F', border: 'transparent' },
  { color: '#B3ED9F', border: 'transparent' },
  { color: '#9FE4ED', border: 'transparent' },
  { color: '#9FA7ED', border: 'transparent' },
  { color: '#E29FED', border: 'transparent' },
  { color: '#DBDBDB', border: 'transparent' },
];

const generateZodSchema = () => {
  return z.object({
    itemName: z.string().optional(),
    gstCategory: z.string().optional(),
    categoryOrder: z.string().optional(),
    serviceCharge: z.string().optional(),
    showOnPos: z.string().optional(),
    showOnWeb: z.string().optional(),
  });
};

const AddCategory = ({ open, onClose, formTitle, edit, setEdit }: CategoryDrawerProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema();
  const { drawerPosition } = useDrawerContext();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: '',
      logoImage: '',
      gstCategory: '',
      categoryOrder: '',
      serviceCharge: '',
      showOnPos: false,
      showOnWeb: false,
    },
  });
  console.log('edit=>', edit);
  useEffect(() => {
    reset({
      itemName: edit?.itemName || '',
      logoImage: edit?.logoImage || '',
      showOnPos:
        typeof edit?.showOnPos === 'boolean' ? edit?.showOnPos : edit?.showOnPos === 'true',
      showOnWeb:
        typeof edit?.showOnWeb === 'boolean' ? edit?.showOnWeb : edit?.showOnWeb === 'true',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = () => {
    // eslint-disable-next-line no-console
  };
  const logoImage = watch('logoImage');
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setValue('logoImage', imgData);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setValue('logoImage', '');
  };
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  return (
    <Drawer
      open={open}
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
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} showMobileView={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout cardHeading={translate('new_category')}>
          <Controller
            control={control}
            name="itemName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('category_name')}
                helperText={errors.itemName?.message}
                error={Boolean(errors.itemName)}
                placeholder={translate('enter_category_name')}
              />
            )}
          />

          <Controller
            name="gstCategory"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('gst')}
                options={GSTCategoryData}
                placeholder={translate('include_gst')}
                helperText={errors.gstCategory?.message}
                error={Boolean(errors.gstCategory)}
              />
            )}
          />

          <Controller
            name="categoryOrder"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('category_order')}
                options={CategoryOrder}
                placeholder={translate('category_order_on_pos')}
                helperText={errors.categoryOrder?.message}
                error={Boolean(errors.categoryOrder)}
              />
            )}
          />

          <Controller
            name="serviceCharge"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('service_charge')}
                options={GSTCategoryData}
                placeholder={translate('include_service_charge')}
                helperText={errors.serviceCharge?.message}
                error={Boolean(errors.serviceCharge)}
              />
            )}
          />

          <GSCustomStackLayout
            direction={{ md: 'column', xs: 'column' }}
            spacing={2}
            withoutGrid
            sx={{ mt: 2 }}
          >
            <ColorPicker heading={translate('category_background_color')} colors={colorset1} />
          </GSCustomStackLayout>

          <GSCustomStackLayout direction={{ md: 'column', xs: 'column' }} spacing={2} withoutGrid>
            <Controller
              name="showOnPos"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <GSSwitchButton
                  {...field}
                  checked={value}
                  onChange={(event: React.ChangeEvent<unknown>) => {
                    const target = event.target as HTMLInputElement;
                    onChange(target.checked);
                  }}
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
              name="showOnWeb"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <GSSwitchButton
                  {...field}
                  checked={value}
                  onChange={(event: React.ChangeEvent<unknown>) => {
                    const target = event.target as HTMLInputElement;
                    onChange(target.checked);
                  }}
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
          </GSCustomStackLayout>
          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logoImage"
              selectedImg={logoImage}
              onClick={handleRemoveImage}
              quantity={false}
              category={false}
              onChange={handleImageUpload}
            />
          </GSCustomStackLayout>
        </FormLayout>
        <Box display="flex" justifyContent="flex-end" mt={3} mb={5}>
          <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
            {translate('cancel')}
          </CustomButton>

          <CustomButton variant="contained" type="submit">
            {translate('save')}
          </CustomButton>
        </Box>
      </form>
    </Drawer>
  );
};

export default AddCategory;
