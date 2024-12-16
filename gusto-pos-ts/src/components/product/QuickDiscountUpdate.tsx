'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import { quickDiscountMock, selectPriceUpdate } from '@/mock/products';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import QuickUpdateTable from '@/components/widgets/quickUpdateTable/QuickUpdateTable';
import { TranslateFn } from '@/types/localization-types';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
interface FormData {
  productCategory: string;
}

// Zod schema generation function with localized error messages
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    productCategory: z.string().min(1, translate('customer_group_name_required')),
  });
};

interface ProductData {
  name: string;
  price: number;
  specialPrice1: number;
  specialPrice2: number;
  specialPrice3: number;
  minQty1: number;
  minQty2: number;
  minQty3: number;
}

const QuickDiscountUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [productData, setProductData] = useState<ProductData[] | null>(null);

  // const handleCategoryChange = (
  //   event: SelectChangeEvent<string>,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   _child: React.ReactNode,
  // ) => {
  //   const category = event.target.value as string;
  //   setSelectedCategory(category);
  //   setProductData(quickDiscountMock[category] || []);
  // };
  const handleCategoryChange = (value: string | null) => {
    const category = value || ''; // Handle null by defaulting to an empty string
    console.log('🚀 ~ handleCategoryChange ~ category:', category);
    setSelectedCategory(category);
    setProductData(quickDiscountMock[category] || []);
  };

  const {
    handleSubmit,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategory: '',
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
          <FormLayout cardHeading={translate('price_category')}>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
              }}
            >
              <GSSelectInput
                sx={{ mr: 2, minWidth: 220 }}
                label={translate('price_category')}
                value={selectedCategory}
                options={selectPriceUpdate}
                onChange={(value) => handleCategoryChange(value as string | null)}
                placeholder={translate('select_category')}
              />

              <CustomButton
                variant="contained"
                type="submit"
                sx={{ height: 44, marginTop: '32px' }}
              >
                {translate('retrieve')}
              </CustomButton>
            </Box>
          </FormLayout>
          <Box>
            {/* Conditionally render the table if a category is selected */}
            {selectedCategory && productData && (
              <QuickUpdateTable selectedCategory={selectedCategory} productData={productData} />
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default QuickDiscountUpdate;
