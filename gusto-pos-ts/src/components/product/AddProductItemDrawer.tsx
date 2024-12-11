import Drawer from '@mui/material/Drawer';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Button } from '@mui/material';
import { UserRecord } from '@/types/table-types';
import { Dispatch, SetStateAction } from 'react';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import GSSwitchButton from '@/components/widgets/switch/GSSwitchButton';
import { TranslateFn } from '@/types/localization-types';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import PageHeader from '@/components/widgets/headers/PageHeader';

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
type SwitchStates = {
  hot: boolean;
  cold: boolean;
  bread: boolean;
  sides: boolean;
  chineseName: boolean;
};
interface ImageUpload {
  imageLabel: string;
  selectedImg: string;
  quantity: boolean;
}
interface FormData {
  itemName: string;
  itemNamePOS: string;
  description: string;
  unit: string;
  itemCategory: string;
  productSkuBarcode: string;
  chineseName1: string;
  chineseName2: string;
  chineseName3: string;
  validFromDate: Date;
  validtoDate: Date;
  validFromTime: string;
  validToTime: string;
  // ... other fields
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    itemName: z.string({required_error:translate('item_name_required')}).min(1, translate('item_name_required')),
    itemNamePOS: z.string({required_error:translate('item_short_name_on_pos_required')}).min(1, translate('item_short_name_on_pos_required')),
    description: z.string({required_error:translate('description_required')}).min(1, translate('description_required')),
    unit: z.string({required_error:translate('unit_required')}).min(1,translate('unit_required')),
    itemCategory: z.string({required_error:translate('item_category_required')}).min(1, translate('item_category_required')),
    productSkuBarcode: z.string({required_error:translate('product_sku_barcode_required')}).min(1, translate('product_sku_barcode_required')),
  });
};

const AddProductItem = ({
  open,
  onClose,
  formTitle,

  edit,
  setEdit,
}: AddProductItemDrawer) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const SelectGender = [
    { value: 'pizza', label: 'Pizza' },
    { value: 'pasta', label: 'Pasta' },
    { value: 'burger', label: 'Burger' },
  ];
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      itemName: '',
      itemNamePOS: '',
      description: '',
      unit: '',
      itemCategory: '',
      productSkuBarcode: '',
      chineseName1: '',
      chineseName2: '',
      chineseName3: '',
      validFromDate: new Date(),
      validtoDate: new Date(),
      validToTime: '',
      validFromTime: '',
    },
  });
  useEffect(() => {
    reset({
      itemName: edit?.itemName ?? '',
      unit: edit?.unit || '',
    });
  }, [edit, reset]);
  // useEffect(() => {
  //   reset({
  //     itemName: formTitle === translate('edit_product') ? (edit?.itemName ?? '') : '',
  //     // gender: edit?.gender || 'Male',

  //   });
  // }, [edit, reset]);
  const [showTextFields, setShowTextfield] = useState(false);
  const onSubmit: SubmitHandler<FormData | EditType> = () => {};
  const [images, setImages] = useState<ImageUpload[]>([
    { imageLabel: 'Bun', selectedImg: '', quantity: true },
    { imageLabel: 'Petty', selectedImg: '', quantity: true },
    { imageLabel: 'Veg', selectedImg: '', quantity: true },
    { imageLabel: 'Ham', selectedImg: '', quantity: true },
  ]);
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    hot: false,
    cold: false,
    bread: false,
    sides: false,
    chineseName: false,
  });
  const handleToggleChange = (name: keyof SwitchStates) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
    setShowTextfield((prev) => !prev); // Toggle visibility
  };

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
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  const addImageUploadField = () => {
    const newImageLabel = `Image ${images.length + 1}`;
    setImages([...images, { imageLabel: newImageLabel, selectedImg: '', quantity: true }]);
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      sx={{
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
      }}
    >
      {' '}
      <PageHeader title={formTitle} hideSearch={true} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5} bgcolor="transparent">
          <FormLayout cardHeading={translate('item_detail')}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <GSTextInput
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
                  label={translate('unit')}
                  helperText={errors.unit?.message}
                  error={Boolean(errors.unit)}
                  placeholder={translate('enter_pc/kg/gram')}
                />
              )}
            />

            <Controller
              control={control}
              name="itemCategory"
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  options={SelectGender}
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
                  label={translate('product_sku_barcode')}
                  helperText={errors.productSkuBarcode?.message}
                  error={Boolean(errors.productSkuBarcode)}
                  placeholder={translate('enter_item_category')}
                />
              )}
            />

            <GSSwitchButton
              checked={switchStates.chineseName}
              onChange={() => handleToggleChange('chineseName')}
              label={translate('add_chinese_name')}
              labelPlacement="start"
            />
            <GSCustomStackLayout withoutGrid>
              <Box>
                {showTextFields && (
                  <Box
                    mt={2}
                    sx={{
                      width: '100%',
                      gap: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignItems: 'start',
                      px: 2,
                    }}
                    mb={3}
                  >
                    <Controller
                      control={control}
                      name="chineseName1"
                      render={({ field }) => (
                        <GSTextInput
                          {...field}
                          label={translate('Chinese Name 1')}
                          helperText={errors.chineseName1?.message}
                          error={Boolean(errors.chineseName1)}
                          placeholder={translate('enter_chinese_name')}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName2"
                      render={({ field }) => (
                        <GSTextInput
                          {...field}
                          label={translate('Chinese Name 2')}
                          helperText={errors.chineseName2?.message}
                          error={Boolean(errors.chineseName2)}
                          placeholder={translate('enter_chinese_name')}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="chineseName3"
                      render={({ field }) => (
                        <GSTextInput
                          {...field}
                          label={translate('Chinese Name 3')}
                          helperText={errors.chineseName3?.message}
                          error={Boolean(errors.chineseName3)}
                          placeholder={translate('enter_chinese_name')}
                        />
                      )}
                    />
                  </Box>
                )}
              </Box>
            </GSCustomStackLayout>
          </FormLayout>
        </Box>

        <Box mb={2} sx={{ width: '100%' }}>
          <FormLayout cardHeading={translate('recipe')}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: 'full' }}>
              <Box sx={{ width: '100%' }}>
                {' '}
                <Controller
                  control={control}
                  name="chineseName3"
                  render={({ field }) => (
                    <GSTextInput
                      {...field}
                      label={translate('chinese_name_3')}
                      helperText={errors.chineseName3?.message}
                      error={Boolean(errors.chineseName3)}
                      placeholder={translate('enter_chinese_name_3')}
                    />
                  )}
                />
              </Box>

              <Box>
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
                  {translate('add_image_upload')}
                </Button>
              </Box>
            </Box>
          </FormLayout>
          <FormLayout cardHeading={translate('modifiers')}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* Hot Section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 41,
                  height: '60px',
                }}
              >
                <GSSwitchButton
                  checked={switchStates.hot}
                  onChange={() => handleToggleChange('hot')}
                  label={translate('hot')}
                />
                {switchStates.hot && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: '10px' }}>Minimum Selection</span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Cold Section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 40,
                  height: '60px',
                }}
              >
                <GSSwitchButton
                  checked={switchStates.cold}
                  onChange={() => handleToggleChange('cold')}
                  label={translate('cold')}
                />
                {switchStates.cold && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: '10px' }}>Minimum Selection</span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Types of Bread Section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 30,
                  height: '60px',
                }}
              >
                <GSSwitchButton
                  checked={switchStates.bread}
                  onChange={() => handleToggleChange('bread')}
                  label={translate('types_of_bread')}
                />
                {switchStates.bread && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: '10px' }}>Minimum Selection</span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>

              {/* Choice of Sides Section */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 30,
                  height: '60px',
                }}
              >
                <GSSwitchButton
                  checked={switchStates.sides}
                  onChange={() => handleToggleChange('sides')}
                  label={translate('choice_of_sides')}
                />
                {switchStates.sides && (
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    gap="3"
                    mb={2}
                  >
                    <span style={{ marginRight: '10px' }}>Minimum Selection</span>
                    <Button variant="contained">-</Button>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        marginRight: '10px',
                        marginLeft: '10px',
                      }}
                    ></div>
                    <Button variant="contained">+</Button>
                  </Box>
                )}
              </Box>
            </Box>
          </FormLayout>
          <FormLayout cardHeading={translate('price')}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <GSTextInput
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
                  label={translate('unit')}
                  helperText={errors.unit?.message}
                  error={Boolean(errors.unit)}
                  placeholder={translate('enter_pc/kg/gram')}
                />
              )}
            />

            <Controller
              control={control}
              name="itemCategory"
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  options={SelectGender}
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
                  label={translate('product_sku_barcode')}
                  helperText={errors.productSkuBarcode?.message}
                  error={Boolean(errors.productSkuBarcode)}
                  placeholder={translate('enter_item_category')}
                />
              )}
            />
          </FormLayout>
          <FormLayout cardHeading={translate('outlets')}>
            <Controller
              control={control}
              name="itemName"
              render={({ field }) => (
                <GSTextInput
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
                  label={translate('unit')}
                  helperText={errors.unit?.message}
                  error={Boolean(errors.unit)}
                  placeholder={translate('enter_pc/kg/gram')}
                />
              )}
            />

            <Controller
              control={control}
              name="itemCategory"
              render={({ field }) => (
                <GSSelectInput
                  {...field}
                  options={SelectGender}
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
                  label={translate('product_sku_barcode')}
                  helperText={errors.productSkuBarcode?.message}
                  error={Boolean(errors.productSkuBarcode)}
                  placeholder={translate('enter_item_category')}
                />
              )}
            />
          </FormLayout>

          <Box>
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
                    options={SelectGender}
                    placeholder={translate('select_time')}
                    helperText={errors.validToTime?.message}
                    error={Boolean(errors.validToTime)}
                  />
                )}
              />
            </FormLayout>
          </Box>
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
