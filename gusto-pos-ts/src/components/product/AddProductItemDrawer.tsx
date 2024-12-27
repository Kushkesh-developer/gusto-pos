import Drawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { UserRecord } from '@/types/table-types';
import { Dispatch, SetStateAction } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { TranslateFn } from '@/types/localization-types';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { timeSlots, selectPriceUpdate } from '@/mock/products';
import { outlets } from '@/mock/common';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';

type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName?: string;
  unit?: string;
};

type AddProductItemDrawer = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface ImageUpload {
  imageLabel: string;
  selectedImg: string;
  quantity: boolean;
}

interface FormData {
  itemName: string;
  price: string;
  itemNamePOS: string;
  description: string;
  unit: string;
  itemCategory: string;
  productSkuBarcode: string;
  productSkuBarcodePrice: string;
  validFromDate: Date;
  validtoDate: Date;
  outlets: {
    [key: string]: boolean; // Dynamic outlet selection
  };
  validFromTime: string;
  validToTime: string;
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
  const itemNameRequired = translate('item_name_required');
  const itemShortNameOnPOSRequired = translate('item_short_name_on_pos_required');
  const descriptionRequired = translate('description_required');
  const unitRequired = translate('unit_required');
  const itemCategoryRequired = translate('item_category_required');
  const productSkuBarcodeRequired = translate('product_sku_barcode_required');
  const price = translate('price_is_required');
  const createZodField = (errorMessage: string) =>
    z.string({ required_error: errorMessage }).min(1, errorMessage);

  return z.object({
    itemName: createZodField(itemNameRequired),
    itemNamePOS: createZodField(itemShortNameOnPOSRequired),
    description: createZodField(descriptionRequired),
    unit: createZodField(unitRequired),
    itemCategory: createZodField(itemCategoryRequired),
    price: createZodField(price),
    productSkuBarcode: createZodField(productSkuBarcodeRequired),
    outlets: z.record(z.boolean()),
  });
};

const AddProductItem = ({ open, onClose, formTitle, edit, setEdit }: AddProductItemDrawer) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    itemName: '',
    itemNamePOS: '',
    description: '',
    unit: '',
    itemCategory: '',
    productSkuBarcode: '',
    price: '',
    validFromDate: new Date(),
    validtoDate: new Date(),
    validToTime: '',
    validFromTime: '',
    outlets: {
      // Downtown: false,
      // 'Chai Chee': false,
      // VelvetBasil: false,
      // CraveLyneBistro: false,
      // BaccaBucci: false,
      // SuperMart: false,
      // FreshFoods: false,
      // VeggieMarket: false,
      // HouseholdStore: false,
      // Bakery: false,
    },
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

  useEffect(() => {
    reset({
      itemName: edit?.itemName ?? '',
      unit: edit?.unit || '',
    });
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData | EditType> = () => {};

  const [images, setImages] = useState<ImageUpload[]>([
    { imageLabel: 'Bun', selectedImg: '', quantity: true },
    { imageLabel: 'Petty', selectedImg: '', quantity: true },
  ]);

  const handleImageUpload = (index: number, file: string) => {
    const newImages = [...images];
    newImages[index].selectedImg = file;
    setImages(newImages);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  };

  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };

  const addImageUploadField = () => {
    const newImageLabel = `Image ${images.length + 1}`;
    setImages([...images, { imageLabel: newImageLabel, selectedImg: '', quantity: true }]);
  };
  console.log('outlet', outlets);

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
        <Box mb={5} bgcolor="transparent">
          <FormLayout cardHeading={translate('item_detail')}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('item_name')}
                  helperText={errors.itemName?.message}
                  error={Boolean(errors.itemName)}
                  placeholder={translate('enter_item_name')}
                />
              )}
            />
            <Controller
              control={control}
              name="itemNamePOS"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('item_short_name_on_pos')}
                  helperText={errors.itemNamePOS?.message}
                  error={Boolean(errors.itemNamePOS)}
                  placeholder={translate('enter_item_name_pos')}
                />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <GSTextInput
                  requiredMark
                  {...field}
                  label={translate('description')}
                  helperText={errors.description?.message}
                  error={Boolean(errors.description)}
                  placeholder={translate('enter_description')}
                />
              )}
            />
            <Controller
              control={control}
              name="unit"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('unit')}
                  helperText={errors.unit?.message}
                  error={Boolean(errors.unit)}
                  placeholder={translate('enter_pc_kg_km')}
                />
              )}
            />
            <Controller
              control={control}
              name="itemCategory"
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  requiredMark
                  options={selectPriceUpdate}
                  placeholder={translate('select_item_category')}
                  label={translate('item_category')}
                  helperText={errors.itemCategory?.message}
                  error={Boolean(errors.itemCategory)}
                />
              )}
            />
            <Controller
              control={control}
              name="productSkuBarcode"
              render={({ field }) => (
                <GSTextInput
                  {...field}
                  requiredMark
                  label={translate('product_sku_barcode')}
                  helperText={errors.productSkuBarcode?.message}
                  error={Boolean(errors.productSkuBarcode)}
                  placeholder={translate('enter_product_sku')}
                />
              )}
            />
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <GSNumberInput
                  {...field}
                  requiredMark
                  label={translate('price')}
                  helperText={errors.price?.message}
                  error={Boolean(errors.price)}
                  placeholder={translate('enter_the_price')}
                />
              )}
            />
          </FormLayout>
        </Box>

        <Box mb={2} sx={{ width: '100%' }}>
          <FormLayout cardHeading={translate('recipe')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 'full' }}>
              <div>
                {/* Render the dynamic GSImageUpload components */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mb: 3,
                  }}
                >
                  {images.map((image, index) => (
                    <GSImageUpload
                      key={index}
                      name={`productImage_${index}`}
                      selectedImg={image.selectedImg}
                      quantity
                      imagelabel={image.imageLabel}
                      onClick={() => handleRemoveImage(index)}
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          handleImageUpload(index, URL.createObjectURL(event.target.files[0]));
                        }
                      }}
                    />
                  ))}
                </Box>

                {/* Add button to dynamically add new GSImageUpload fields */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addImageUploadField}
                  sx={{ mt: 2 }}
                >
                  {translate('add_more_ingredient')}
                </Button>
              </div>
            </Box>
          </FormLayout>

          {/* Apply to these outlet checkboxes */}
          <FormLayout cardHeading={translate('apply_to_these_outlet')}>
            {outlets.map((outlet) => (
              <Controller
                key={outlet.value}
                name={`outlets.${outlet}`}
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
                      label={translate(outlet.label)} // Dynamically translate outlet names
                    />
                  </FormGroup>
                )}
              />
            ))}
          </FormLayout>

          <div>
            <FormLayout cardHeading={translate('availability')}>
              <GSDateInput
                id="valid_From_Date"
                label={translate('valid_from_date')}
                error={errors.validFromDate?.message}
              />

              <GSDateInput
                id="valid_to_Date"
                label={translate('valid_to_date')}
                error={errors.validtoDate?.message}
              />

              <Controller
                name="validToTime"
                control={control}
                render={({ field }) => (
                  <GSSelectInput
                    {...field}
                    label={translate('valid_to_time')}
                    options={timeSlots}
                    placeholder={translate('select_time')}
                    helperText={errors.validToTime?.message}
                    error={Boolean(errors.validToTime)}
                  />
                )}
              />
            </FormLayout>
          </div>

          <Box display="flex" justifyContent="flex-end" mt={3}>
            <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={handleClose}>
              {translate('cancel')}
            </CustomButton>

            <CustomButton variant="contained" type="submit">
              {translate('save')}
            </CustomButton>
          </Box>
        </Box>
      </form>
    </Drawer>
  );
};

export default AddProductItem;
