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
  Fab,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Flip from '@mui/icons-material/Flip';
import Search from '@mui/icons-material/Search';
import Add from '@mui/icons-material/Add';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import GSNumberInput from '@/components/widgets/inputs/GSNumberInput';
import ProductCard from '@/components/stock-manager/ProductCard';
import Grid from '@mui/material/Grid2';
import { TranslateFn } from '@/types/localization-types';
import StockTable from '@/components/stock-manager/StockTable';
import { product_categories, product_mock_data, userList, usersName } from '@/mock/stock-manager';
import ClickableCard from '@/components/widgets/cards/ClickableCard';
import UserDrawer from '@/components/stock-manager/UserDrawer';
import { ColumnType } from '@/types/table-types';
import CopyrightFooter from '@/components/widgets/copyright/CopyrightFooter';
import SettingsDrawer from '@/components/theme-settings/SettingsDrawer';
import { useDrawerContext } from '@/context/DrawerProvider';
import SettingsIcon from '@mui/icons-material/Settings';

interface FormData {
  user: string;
  taxOrder: string;
  discount: number;
  shipping: number;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    user: z.string().min(1, translate('user_required')),
    taxOrder: z.string().min(1, translate('order_tax_required')),
    discount: z.string(),
    shipping: z.string(),
  });
};

interface CardButtonData {
  icon?: string;
  title: string;
  selected: boolean;
  onClick: () => void;
}

interface ProductData {
  [key: string]: unknown;
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const CardButton = (props: CardButtonData) => {
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
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categoryProducts, setCategoryProducts] = useState(product_mock_data);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [users, setUsers] = useState(usersName);
  const [total, setTotal] = useState<number>(0);
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const theme = useTheme();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileDrawerOpen(false);
      }
    };
    const y = total;
    console.log(y);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { drawerPosition } = useDrawerContext();

  const columnNames: ColumnType[] = [
    { key: 'id', label: translate('id'), visible: true },
    { key: 'title', label: translate('name'), visible: true },
    // { key: 'quantity', label: translate('quantity'), visible: true },
    {
      key: 'quantity',
      label: 'Quantity',
      visible: true,
      width: '120px',
    },
    { key: 'price', label: translate('sub_total'), visible: true },
    {
      label: translate('action'),
      key: 'action',
      visible: true,
      isAction: true,
      actions: [
        {
          type: 'delete',
          handler: () => console.log('delete'),
        },
      ],
    },
  ];

  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: '',
      taxOrder: '',
      discount: undefined,
      shipping: undefined,
    },
  });
  const handleQuantityChange = (id: string | number, newQuantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          // Update price based on the base price times the new quantity
          const basePrice = product_mock_data.find((p) => p.id === id)?.price || 0;
          return {
            ...product,
            quantity: newQuantity,
            price: basePrice * newQuantity,
          };
        }
        return product;
      }),
    );
  };
  const discount = watch('discount');
  const shipping = watch('shipping');
  const subtotal = products.reduce((acc, product) => {
    const basePrice = product_mock_data.find((p) => p.id === product.id)?.price || 0;
    return acc + basePrice * product.quantity;
  }, 0);

  const discountAmount = Number(discount || 0);
  const shippingAmount = Number(shipping || 0);
  const amountAfterDiscount = Math.max(0, subtotal - discountAmount);
  const taxAmount = amountAfterDiscount * 0.1;
  const grandTotal = amountAfterDiscount + shippingAmount + taxAmount;

  useEffect(() => {
    setTotal(subtotal);
  }, [products, subtotal]);

  const handleReset = () => {
    // Reset all form fields including discount and shipping to 0
    reset({
      user: '',
      taxOrder: '',
      discount: 0, // Set discount to 0
      shipping: 0, // Set shipping to 0
    });
    // Reset products and calculations
    setProducts([]);
    setTotal(0);

    // Reset category selection
    setSelectedCategory('all');
    setCategoryProducts(product_mock_data);

    // Reset QR mode
    setShowQR(false);
  };
  const onSubmit: SubmitHandler<FormData> = () => {};

  function onClickProductTile(product: ProductData) {
    const productExist = products.find((p) => p.id === product.id);
    if (productExist) {
      const newQuantity = productExist.quantity + 1;
      handleQuantityChange(product.id, newQuantity);
    } else {
      const basePrice = product_mock_data.find((p) => p.id === product.id)?.price || 0;
      setProducts([
        ...products,
        {
          ...product,
          quantity: 1,
          price: basePrice,
        },
      ]);
    }
  }

  function onClickCategory(category: string) {
    setCategoryProducts(product_mock_data.filter((product) => product.category === category));
  }
  return (
    <Box
      sx={{ height: { md: '104vh', xs: 'none', lg: '100vh' } }}
      flex={1}
      display={'flex'}
      flexDirection={'column'}
    >
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
        <Box
          flex={1}
          sx={{
            flexDirection: 'column',
            display: 'flex',
            maxWidth: { md: '610px', xl: 'none' },
          }}
        >
          <form
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* User Selection Section */}
            <Paper sx={{ p: 2 }}>
              <Stack gap={2}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={2} display="flex">
                  <Box sx={{ display: 'flex', gap: { xs: 2 }, width: '100%' }}>
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
                      aria-label="add user"
                      onClick={() => setShowUserDrawer(true)}
                    >
                      <Add />
                    </ToggleButton>
                  </Box>
                </Stack>
                <Stack direction={{ xs: 'row', sm: 'row' }} gap={2} display="flex">
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
                    onToggle={() => setShowQR(!showQR)}
                  >
                    {showQR ? <Flip /> : <Search />}
                  </ToggleButton>
                </Stack>
                {isMobile && (
                  <Button
                    variant="contained"
                    sx={{ mb: 1, padding: '10px 16px' }}
                    onClick={() => setIsMobileDrawerOpen(true)}
                  >
                    {translate('add_products')}
                  </Button>
                )}
              </Stack>
            </Paper>

            {/* Stock Table Section */}
            <StockTable
              columns={columnNames}
              filteredProducts={products.map((product) => ({
                ...product,
                price:
                  (product_mock_data.find((p) => p.id === product.id)?.price || 0) *
                  product.quantity,
              }))}
              setFilteredProducts={setProducts}
              currentPage={1}
              currentItems={[]}
              onQuantityChange={handleQuantityChange}
            />

            {/* Summary and Actions Section */}
            <Paper sx={{ mt: 2, p: 2 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ overflow: 'hidden' }}
              >
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
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
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
                    {translate('grand_total')}: L£ {grandTotal.toFixed(2)}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{
                    mx: { xs: 0, sm: 2 },
                    mt: { xs: 2, sm: 0 },
                  }}
                >
                  {translate('inc_tax')}: L£ {taxAmount.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  disabled={products.length === 0}
                  onClick={handleSubmit(onSubmit)}
                  sx={{ mt: { xs: 2, sm: 0 } }}
                >
                  {translate('pay_now')}
                </Button>
                <Button
                  variant="outlined"
                  disabled={products.length === 0}
                  onClick={handleReset}
                  sx={{ mt: { xs: 2, sm: 0 } }}
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
            // overflow: 'scroll',
            pb: 2,
            maxHeight: 'calc(100vh - 110px)',
          }}
        >
          {/* Show directly on desktop */}
          {!isMobile && (
            <Box
              flex={{ ms: 0.8, md: 1, lg: 1.2 }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'scroll',
                pb: 2,
                maxHeight: 'calc(100vh - 110px)',
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
                      badge={
                        (products.find((p) => p.id === product.id)?.quantity ?? 0 > 0)
                          ? products.find((p) => p.id === product.id)?.quantity
                          : undefined
                      }
                      onClick={() => {
                        const existingProduct = products.find((p) => p.id === product.id);
                        const productToAdd: ProductData = {
                          ...product,
                          quantity:
                            (existingProduct?.quantity ?? 0) > 0
                              ? (existingProduct?.quantity ?? 1)
                              : 1,
                        };
                        onClickProductTile(productToAdd);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Mobile Drawer */}
          <Drawer
            anchor="right"
            open={isMobileDrawerOpen}
            onClose={() => setIsMobileDrawerOpen(false)}
            sx={{
              display: { xs: 'table', md: 'table', lg: 'none' },
              flexWrap: 'wrap',
              '& .MuiDrawer-paper': {
                width: '100%',
                height: '100%',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `1px solid ${theme.palette.divider}`,
                p: 2,
              }}
            >
              <Typography variant="h6"> {translate('product')}</Typography>
              <IconButton
                onClick={() => setIsMobileDrawerOpen(false)}
                edge="end"
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ p: 2, height: '100%', overflow: 'auto' }}>
              <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }}>
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
                  <Grid key={product.id} size={{ xs: 6, sm: 6, md: 6 }}>
                    <ProductCard
                      title={product.title}
                      price={product.price}
                      image={product.image}
                      badge={
                        (products.find((p) => p.id === product.id)?.quantity ?? 0 > 0)
                          ? products.find((p) => p.id === product.id)?.quantity
                          : undefined
                      }
                      onClick={() => {
                        const existingProduct = products.find((p) => p.id === product.id);
                        const productToAdd: ProductData = {
                          ...product,
                          quantity:
                            (existingProduct?.quantity ?? 0) > 0
                              ? (existingProduct?.quantity ?? 1)
                              : 1,
                        };
                        onClickProductTile(productToAdd);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Drawer>
        </Box>
      </Stack>
      <SettingsDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={(open) => setDrawerOpen(open)}
        drawerPosition={drawerPosition}
      />
      <Fab
        color="primary"
        aria-label="settings"
        onClick={() => setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: theme.spacing(4),
          [drawerPosition === 'left' ? 'right' : 'left']: theme.spacing(4),
          zIndex: 1300,
        }}
      >
        <SettingsIcon
          sx={{
            fontSize: '2rem',
            cursor: 'pointer',
          }}
        />
      </Fab>
      <CopyrightFooter />
    </Box>
  );
}
