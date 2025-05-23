'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';

import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import { quickDiscountMock, selectPriceUpdate } from '@/mock/products';
import QuickUpdateTable from '@/components/widgets/quickUpdateTable/QuickUpdateTable';

import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';

// Zod schema generation function with localized error messages
const generateZodSchema = (translate) => {
  return z.object({
    productCategory: z.string().min(1, translate('customer_group_name_required')),
  });
};

const QuickPriceUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productData, setProductData] = useState(null);

  const handleCategoryChange = (value) => {
    const category = value || ''; // Handle null by defaulting to an empty string
    console.log('🚀 ~ handleCategoryChange ~ category:', category);
    setSelectedCategory(category);
    setProductData(quickDiscountMock[category] || []);
  };

  const {
    handleSubmit,
    // eslint-disable-next-line no-empty-pattern
    formState: {},
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategory: '',
    },
  });

  const onSubmit = () => {};

  return (
    <div>
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
                label={translate('product_category')}
                value={selectedCategory}
                options={selectPriceUpdate}
                onChange={(value) => handleCategoryChange(value)}
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
          <div>
            {/* Conditionally render the table if a category is selected */}
            {selectedCategory && productData && (
              <QuickUpdateTable selectedCategory={selectedCategory} productData={productData} />
            )}
          </div>
        </Box>
      </form>
    </div>
  );
};

export default QuickPriceUpdate;
