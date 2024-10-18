"use client";
import { useEffect, useState } from "react";
import StockHeader from "@/components/stock-manager/StockHeader";
import GSSearchField from "@/components/widgets/inputs/GSSearchField";
import SelectInput from "@/components/widgets/inputs/GSSelectInput";
import { useLocalization } from "@/context/LocalizationProvider";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Flip from "@mui/icons-material/Flip";
import Search from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import TextInput from "@/components/widgets/inputs/GSTextInput";
import GSNumberInput from "@/components/widgets/inputs/GSNumberInput";
import ProductCard from "@/components/stock-manager/ProductCard";
import Grid from "@mui/material/Grid2";
import { TranslateFn } from "@/types/localization-types";
import StockTable from "@/components/stock-manager/StockTable";
import { columnNames, product_mock_data,userList } from "@/mock/stock-manager";
import ClickableCard from "@/components/widgets/cards/ClickableCard";
import { SvgIconComponent } from "@mui/icons-material";
import UserDrawer from "@/components/stock-manager/UserDrawer";

interface FormData {
  user: string;
  taxOrder: string;
  discount: number;
  shipping: number;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    user: z.string().min(1, translate("gender_required")),
    taxOrder: z.string().min(1, translate("gender_required")),
    discount: z.number(),
    shipping: z.number(),
  });
};



interface CardButtonData {
  icon: React.ReactElement<SvgIconComponent>;
  title: string;
  onClick: () => void;
}

interface ProductData {
  id: string;
  title: string;
  tests: string;
  price: number;
  image: string;
  quantity: number;
}

const CardButton = (props: CardButtonData) => {
  return (
    <ClickableCard onClick={props.onClick}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography sx={{ px: 2 }}>{props.icon}</Typography>
        <Typography>{props.title}</Typography>
      </CardContent>
    </ClickableCard>
  );
};

export default function StockManager() {
  const [showQR, setShowQR] = useState(false);
  const [showUserDrawer, setShowUserDrawer] = useState(false);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const theme = useTheme();

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      user: "",
      taxOrder: "",
      discount: 0,
      shipping: 0,
    },
  });

  const discount = watch("discount");
  const shipping = watch("shipping");

  useEffect(() => {
    setTotal(products.reduce((acc, product) => acc + product.price, 0));
  }, [products]);

  const onSubmit: SubmitHandler<FormData> = () => {};

  function onClickProductTile(product: ProductData) {
    const productExist = products.find((p) => p.id === product.id);

    if (productExist) {
      productExist.quantity += 1;
      productExist.price = productExist.price * productExist.quantity;
    } else {
      products.push(product);
    }

    setProducts([...products]);
  }

  return (
    <Box sx={{ flex: "1 1 auto" }}>
      <StockHeader />
      <Stack
        gap={2}
        sx={{ p: 2 }}
        direction={{ sm: "column", md: "row", lg: "row" }}
      >
        <UserDrawer
          open={showUserDrawer}
          onClose={() => setShowUserDrawer(false)}
        />
        <Box flex={1} sx={{ flexDirection: "column" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Paper sx={{ p: 2, flex: 1 }}>
              <Stack gap={2}>
                <Stack direction="row" gap={2} display="flex">
                  <Box flex={1}>
                    <Controller
                      name="user"
                      control={control}
                      render={({ field }) => (
                        <SelectInput
                          {...field}
                          options={userList}
                          placeholder={translate("select_user")}
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
                      placeHolder={translate("search")}
                      sx={{ height: 44, flex: 1 }}
                      outlined
                    />
                  ) : (
                    <TextInput
                      sx={{
                        flex: 1,
                        "& .MuiInputBase-root": {
                          height: 44,
                        },
                      }}
                      placeholder={translate("enter_barcode")}
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
              filteredUsers={products}
              currentPage={1}
              currentItems={[]}
            />
            <Paper sx={{ mt: 2, p: 2 }}>
              <Stack direction="row" spacing={2} sx={{ overflow: "hidden" }}>
                {/* <Box sx={{ flex: "1 1 auto", backgroundColor:"red"}}/> */}
                <Controller
                  name="taxOrder"
                  control={control}
                  render={({ field }) => (
                    <SelectInput
                      {...field}
                      options={userList}
                      placeholder={translate("select_order_tax")}
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
                      containerSx={{ flex: 1 }}
                      placeholder={translate("discount")}
                      helperText={errors.discount?.message}
                      error={Boolean(errors.discount)}
                      startAdornment={"L£"}
                    />
                  )}
                />
                <Controller
                  name="shipping"
                  control={control}
                  render={({ field }) => (
                    <GSNumberInput
                      {...field}
                      containerSx={{ flex: 1 }}
                      placeholder={translate("shipping")}
                      helperText={errors.shipping?.message}
                      error={Boolean(errors.shipping)}
                      startAdornment={"L£"}
                    />
                  )}
                />
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Stack direction="row" spacing={2} alignItems={"center"}>
                <Stack
                  direction="row"
                  sx={{
                    flex: 1,
                    backgroundColor: theme.palette.grey[200],
                    px: 3,
                    py: 1,
                  }}
                  justifyContent="space-between"
                >
                  <Typography variant="h6">
                    {translate("grand_total")}:
                  </Typography>
                  <Typography variant="h6">
                    L£{" "}
                    {total + total * 0.1 + Number(discount) + Number(shipping)}
                  </Typography>
                </Stack>
                <Typography variant="body1" sx={{ mx: 2 }}>
                  {translate("tax")}: L£ {total * 0.1}
                </Typography>
                <Button
                  variant="contained"
                  disabled={products.length === 0}
                  onClick={handleSubmit(onSubmit)}
                >
                  {translate("pay_now")}
                </Button>
                <Button
                  variant="outlined"
                  disabled={products.length === 0}
                  onClick={() => setProducts([])}
                >
                  {translate("reset")}
                </Button>
              </Stack>
            </Paper>
          </form>
        </Box>
        <Box flex={{ ms: 0.8, md: 1, lg: 1.2 }}>
          <Stack direction="row" gap={2}>
            <CardButton icon={<Add />} title="All" onClick={() => {}} />
            <CardButton icon={<Add />} title="Test" onClick={() => {}} />
          </Stack>
          <Grid container spacing={2} mt={2}>
            {product_mock_data.map((product) => (
              <Grid size={{ xs: 4, md: 4, lg: 3 }} key={product.id}>
                <ProductCard
                  title={product.title}
                  tests={product.tests}
                  price={product.price}
                  image={product.image}
                  onClick={() => {
                    const productToAdd: ProductData = {
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
    </Box>
  );
}
