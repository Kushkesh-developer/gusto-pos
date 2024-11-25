import Drawer from '@mui/material/Drawer';
import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalization } from '@/context/LocalizationProvider';
import * as z from 'zod';
import { Box } from '@mui/material';
import CustomButton from '@/components/widgets/buttons/GSCustomButton';
import GSCard from '@/components/widgets/cards/GSCard';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { TranslateFn } from '@/types/localization-types';
type CustomerGroupFormDrawerProps = {
  open: boolean;
  onClose: () => void;
};
interface FormData {
  customerGroupName: string;
}
const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    customerGroupName: z.string().min(1, translate('customer_group_name_required')),
  });
};

const CustomerGroupForm = (props: CustomerGroupFormDrawerProps) => {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      customerGroupName: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <Drawer
    open={props.open}
    onClose={props.onClose}
    anchor="right"
    sx={{
      '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '50%', p: 2 },
    }}
  >
  <PageHeader title={translate('add_customer_group')} hideSearch={true} />

    <form onSubmit={handleSubmit(onSubmit)}>
      <GSCard heading="Customer Group">
        <Box sx={{ padding: 3 }}>
          <Controller
            control={control}
            name="customerGroupName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('customer_group_name')}
                helperText={errors.customerGroupName?.message}
                error={Boolean(errors.customerGroupName)}
                placeholder={translate('enter_customer_group_name')}
                width="350px"
              />
            )}
          />
        </Box>
      </GSCard>
      <Box display="flex" justifyContent="flex-end" mt={3}>
        <CustomButton variant="outlined" type="button" sx={{ mr: 2 }} onClick={props.onClose}>
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

export default CustomerGroupForm;
