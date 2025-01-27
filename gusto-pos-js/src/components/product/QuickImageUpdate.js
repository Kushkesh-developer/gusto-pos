'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/material';
import { useLocalization } from '@/context/LocalizationProvider';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import QuickImageUpdateTable from '@/components/widgets/quickUpdateTable/QuickImageUpdateTable';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';






const generateZodSchema = (translate) => {
  return z.object({
    productCategory: z.string().min(1, translate('customer_group_name_required'))
  });
};

const SelectPriceUpdate = [
{ value: 'Burger', label: 'Burger' },
{ value: 'Pizza', label: 'Pizza' },
{ value: 'Pasta', label: 'Pasta' },
{ value: 'Salad', label: 'Salad' }];






















const mockData = {
  Burger: [
  {
    name: 'Cheeseburger',
    price: 10,
    specialPrice1: 9,
    specialPrice2: 8,
    specialPrice3: 7,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30,
    image: '/assets/products/burger.jpg'
  },
  {
    name: 'Bacon Burger',
    price: 12,
    specialPrice1: 11,
    specialPrice2: 10,
    specialPrice3: 9,
    minQty1: 15,
    minQty2: 25,
    minQty3: 35,
    image: '/assets/products/burger.jpg'
  }],

  Pizza: [
  {
    name: 'Margherita',
    price: 14,
    specialPrice1: 13,
    specialPrice2: 12,
    specialPrice3: 11,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30,
    image: '/assets/products/pizza.jpg'
  },
  {
    name: 'Pepperoni',
    price: 16,
    specialPrice1: 15,
    specialPrice2: 14,
    specialPrice3: 13,
    minQty1: 15,
    minQty2: 25,
    minQty3: 35,
    image: '/assets/products/pizza.jpg'
  }],

  Pasta: [
  {
    name: 'Spaghetti Bolognese',
    price: 13,
    specialPrice1: 12,
    specialPrice2: 11,
    specialPrice3: 10,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30,
    image: '/assets/products/pasta.jpg'
  },
  {
    name: 'Fettuccine Alfredo',
    price: 14,
    specialPrice1: 13,
    specialPrice2: 12,
    specialPrice3: 11,
    minQty1: 10,
    minQty2: 20,
    minQty3: 30,
    image: '/assets/products/pasta.jpg'
  }],

  Salad: [
  {
    name: 'Caesar Salad',
    price: 8,
    specialPrice1: 7,
    specialPrice2: 6,
    specialPrice3: 5,
    minQty1: 5,
    minQty2: 10,
    image: '/assets/products/salad.jpg',
    minQty3: 15
  },
  {
    name: 'Greek Salad',
    price: 9,
    specialPrice1: 8,
    specialPrice2: 7,
    specialPrice3: 6,
    minQty1: 8,
    minQty2: 16,
    image: '/assets/products/salad.jpg',
    minQty3: 24
  }]

};

export { SelectPriceUpdate, mockData };

const QuickImageUpdate = () => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productData, setProductData] = useState();
  const [categoryStates, setCategoryStates] = useState(

    {});

  const handleCategoryChange = (value) => {
    if (value) {
      setSelectedCategory(value);
      const newProductData = mockData[value] || [];
      setProductData(newProductData);

      // Initialize state for new category if it doesn't exist
      if (!categoryStates[value]) {
        setCategoryStates((prev) => ({
          ...prev,
          [value]: {
            productNames: newProductData.map((product) => product.name),
            productImages: newProductData.map((product) => product.image),
            showOnPos: new Array(newProductData.length).fill(true),
            showOnline: new Array(newProductData.length).fill(true),
            hasCustomImage: new Array(newProductData.length).fill(false)
          }
        }));
      }
    }
  };

  const { handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productCategory: ''
    }
  });

  const onSubmit = () => {};

  const handleStateUpdate = (category, newState) => {
    setCategoryStates((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...newState
      }
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={5}>
          <FormLayout cardHeading={translate('item_category')}>
            <Box
              sx={{
                display: 'flex',
                gap: '16px',
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center'
              }}>

              <GSSelectInput
                sx={{ mr: 2, minWidth: 220 }}
                label={translate('menu_item_category')}
                options={SelectPriceUpdate}
                value={selectedCategory} // Add this line
                onChange={(value) => handleCategoryChange(value)}
                placeholder={translate('select_category')} />

              <CustomButton
                variant="contained"
                type="submit"
                sx={{ height: 44, marginTop: '32px' }}>

                {translate('retrieve')}
              </CustomButton>
            </Box>
          </FormLayout>
          <div>
            {selectedCategory && productData && categoryStates[selectedCategory] &&
            <QuickImageUpdateTable
              selectedCategory={selectedCategory}
              productData={productData}
              categoryState={categoryStates[selectedCategory]}
              onStateUpdate={(newState) => handleStateUpdate(selectedCategory, newState)} />

            }
          </div>
        </Box>
      </form>
    </div>);

};

export default QuickImageUpdate;