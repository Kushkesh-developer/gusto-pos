'use client';
import { useEffect, useState } from 'react';
import StockHeader from '@/components/stock-manager/StockHeader';
import GSSearchField from '@/components/widgets/inputs/GSSearchField';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CardContent,
  Divider,
  Paper,
  Stack,
  ToggleButton,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Flip from '@mui/icons-material/Flip';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import ProductCard from '@/components/stock-manager/ProductCard';
import Grid from '@mui/material/Grid2';

import StockTable from '@/components/stock-manager/StockTable';
import { product_categories, product_mock_data, userList } from '@/mock/stock-manager';
import ClickableCard from '@/components/widgets/cards/ClickableCard';
import UserDrawer from '@/components/stock-manager/UserDrawer';

import CopyrightFooter from '@/components/widgets/copyright/CopyrightFooter';

const generateZodSchema = (translate) => {
  return z.object({
    user: z.string().min(1, translate('user_required')),
    taxOrder: z.string().min(1, translate('order_tax_required')),
    discount: z.string(),
    shipping: z.string(),
  });
};

const CardButton = (props) => {
  return (
    <ClickableCard onClick={props.onClick} hoverCardSX={{ borderWidth: props.selected ? 1 : 0 }}>
      <CardContent sx={{ textAlign: 'center', direction: 'rtl' }}>
        <Typography sx={{ px: 2, fontSize: 22 }}>{props.icon}</Typography>
        <Typography fontSize={14}>{props.title}</Typography>
      </CardContent>
    </ClickableCard>
  );
};

export default function StockManager() {
  const [showQR, setShowQR] = useState(false);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState(product_mock_data);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [users, setUsers] = useState(userList);
  const [total, setTotal] = useState(0);
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const theme = useTheme();

  // const handleDelete = (id: string | number) => {
  //   setProducts(products.filter((product) => product.id !== id));
  // };

  const columnNames = [
    { key: 'id', label: translate('id'), visible: true },
    { key: 'title', label: translate('name'), visible: true },
    { key: 'quantity', label: translate('quantity'), visible: true },
    { key: 'price', label: translate('sub_total'), visible: true },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'delete',
          // eslint-disable-next-line no-console
          handler: () => console.log('delete'),
        },
      ],
    },
  ];

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      user: '',
      taxOrder: '',
      discount: 0,
      shipping: 0,
    },
  });

  const discount = watch('discount');
  const shipping = watch('shipping');

  useEffect(() => {
    setTotal(products.reduce((acc, product) => acc + product.price, 0));
  }, [products]);

  const onSubmit = () => {};

  function onClickProductTile(product) {
    const productExist = products.find((p) => p.id === product.id);

    if (productExist) {
      productExist.quantity += 1;
      productExist.price = productExist.price * productExist.quantity;
    } else {
      products.push(product);
    }

    setProducts([...products]);
  }

  function onClickCategory(category) {
    setCategoryProducts(product_mock_data.filter((product) => product.category === category));
  }

  return (
    <Box sx={{ height: '100vh' }} flex={1} display={'flex'} flexDirection={'column'}>
      <StockHeader />
      <Stack
        gap={2}
        sx={{ p: 2, display: 'flex', flexGrow: 1 }}
        direction={{ sm: 'column', md: 'row', lg: 'row' }}
      >
        <UserDrawer
          open={showUserDrawer}
          onClose={() => setShowUserDrawer(false)}
          onAddUser={(user) =>
            setUsers([{ label: user.firstName, value: user.firstName }, ...users])
          }
        />

        <Box flex={1} sx={{ flexDirection: 'column', display: 'flex' }}>
          <form
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Paper sx={{ p: 2 }}>
              <Stack gap={2}>
                <Stack direction="row" gap={2} display="flex">
                  <Box flex={1}>
                    <Controller
                      name="user"
                      control={control}
                      render={({ field }) => (
                        <GSSelectInput
                          {...field}
                          options={users}
                          placeholder={translate('select_user')}
                          helperText={errors.user?.message}
                          error={Boolean(errors.user)}
                        />
                      )}
                    />
                  </Box>
                  <ToggleButton
                    value="centered"
                    sx={{ height: 44, width: 44 }}
                    aria-label="left aligned"
                    onClick={() => setShowUserDrawer(true)}
                  >
                    <Add />
                  </ToggleButton>
                </Stack>
                <Stack direction="row" gap={2} display="flex">
                  {showQR ? (
                    <GSSearchField
                      placeHolder={translate('search')}
                      sx={{ height: 44, flex: 1 }}
                      outlined
                    />
                  ) : (
                    <GSTextInput
                      sx={{
                        flex: 1,
                        '& .MuiInputBase-root': {
                          height: 44,
                        },
                      }}
                      placeholder={translate('enter_barcode')}
                    />
                  )}
                  <ToggleButton
                    value="centered"
                    sx={{ height: 44, width: 44 }}
                    onToggle={() => {
                      setShowQR(!showQR);
                    }}
                  >
                    {showQR ? <Flip /> : <Search />}
                  </ToggleButton>
                </Stack>
              </Stack>
            </Paper>

            <StockTable
              columns={columnNames}
              filteredProducts={products}
              setFilteredProducts={setProducts}
              currentPage={1}
              currentItems={[]}
            />

            <Paper sx={{ mt: 2, p: 2 }}>
              <Stack direction="row" spacing={2} sx={{ overflow: 'hidden' }}>
                {/* <Box sx={{ flex: "1 1 auto", backgroundColor:"red"}}/> */}
                <Controller
                  name="taxOrder"
                  control={control}
                  render={({ field }) => (
                    <GSSelectInput
                      sx={{ minWidth: '153px' }}
                      {...field}
                      options={userList}
                      placeholder={translate('select_order_tax')}
                      helperText={errors.taxOrder?.message}
                      error={Boolean(errors.taxOrder)}
                    />
                  )}
                />

                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <GSNumberInput
                      {...field}
                      placeholder={translate('discount')}
                      helperText={errors.discount?.message}
                      error={Boolean(errors.discount)}
                      startAdornment={'L£'}
                    />
                  )}
                />

                <Controller
                  name="shipping"
                  control={control}
                  render={({ field }) => (
                    <GSNumberInput
                      {...field}
                      placeholder={translate('shipping')}
                      helperText={errors.shipping?.message}
                      error={Boolean(errors.shipping)}
                      startAdornment={'L£'}
                    />
                  )}
                />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} alignItems={'center'}>
                <Stack
                  direction="row"
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.primary.light,
                    px: 3,
                    py: 1,
                    borderRadius: 1,
                  }}
                  justifyContent="space-between"
                >
                  <Typography variant="h6" color="white">
                    {translate('grand_total')}:
                  </Typography>
                  <Typography variant="h6" color="white">
                    L£ {total + total * 0.1 + Number(discount) + Number(shipping)}
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  {translate('tax')}: L£ {total * 0.1}
                </Typography>
                <Button
                  variant="contained"
                  disabled={products.length === 0}
                  onClick={handleSubmit(onSubmit)}
                >
                  {translate('pay_now')}
                </Button>
                <Button
                  variant="outlined"
                  disabled={products.length === 0}
                  onClick={() => setProducts([])}
                >
                  {translate('reset')}
                </Button>
              </Stack>
            </Paper>
          </form>
        </Box>
        <Box
          flex={{ ms: 0.8, md: 1, lg: 1.2 }}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflow: 'scroll',
            pb: 2,
            maxHeight: 'calc(100vh - 110px)', //this 126px depends on the above and below item's of table.
          }}
        >
          <Stack direction="row" gap={2}>
            {product_categories.map((category) => (
              <CardButton
                key={category.value}
                icon={category.icon}
                title={category.label}
                selected={selectedCategory == category.value}
                onClick={() => {
                  if (category.value == selectedCategory) {
                    setSelectedCategory('');
                    setCategoryProducts(product_mock_data);
                  } else {
                    setSelectedCategory(category.value);
                    onClickCategory(category.value);
                  }
                }}
              />
            ))}
          </Stack>
          <Grid container spacing={2} mt={2}>
            {categoryProducts.map((product) => (
              <Grid size={{ xs: 2, md: 6, lg: 3 }} key={product.id}>
                <ProductCard
                  title={product.title}
                  price={product.price}
                  image={product.image}
                  onClick={() => {
                    const productToAdd = {
                      ...product,
                      quantity: 1,
                    };
                    productToAdd.quantity = 1;
                    onClickProductTile(productToAdd);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
      <CopyrightFooter />
    </Box>
  );
}
