import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import FormLayout from '@/components/widgets/forms/GSFormCardLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import GSTextInput from '@/components/widgets/inputs/GSTextInput';
import { useLocalization } from '@/context/LocalizationProvider';
import { z } from 'zod';
import { TranslateFn } from '@/types/localization-types';
import { Button } from '@mui/material';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';
type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  itemName?: string;
  unit?: string;
  DiscountName?: string;
  terminalId?: string;
  terminalName?: string;
  outlets?: string;
};

type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};
interface FormData {
  terminalId: string;
  terminalName: string;
  outlets: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    terminalId: z.string().min(1, translate('id_is_required')),
    terminalName: z.string().min(1, translate('terminal_name_is_required')),
    outlets: z.string().min(1, translate('outlet_is_required')),
  });
};

export default function TerminalDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit,
}: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    terminalId: '',
    terminalName: '',
    outlets: '',
  };
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });
  useEffect(() => {
    console.log('hello', formTitle, edit?.username);
    if (edit) {
      reset({
        terminalId: edit?.terminalId || '',
        terminalName: edit?.terminalName || '',
        outlets: edit?.outlets || ' ',
      });
    }
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
  };
  const handleClose = () => {
    reset({
      ...defaultValues,
    });
    setEdit(null); // Reset `editMode` when closing
    onClose(); // Call the parent `onClose` function
  };
  const handleDrawerClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === 'backdropClick') {
      return;
    }
    handleClose();
  };
  return (
    <Drawer
      open={open}
      onClose={handleDrawerClose}
      anchor={drawerPosition === 'left' ? 'right' : 'left'}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: { xs: '100%', sm: '70%', md: '60%' },
          p: 2,
        },
      }}
    >
      <PageHeader title={formTitle} hideSearch={true} onClose={handleClose} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('terminal_details')}>
          <Controller
            control={control}
            name="terminalId"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                {...register('terminalId')}
                label={translate('id')}
                helperText={errors.terminalId?.message}
                error={Boolean(errors.terminalId)}
                placeholder={translate('id')}
              />
            )}
          />
          <Controller
            control={control}
            name="terminalName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('terminal_name')}
                helperText={errors.terminalName?.message}
                error={Boolean(errors.terminalName)}
                placeholder={translate('enter_terminal_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="outlets"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                requiredMark
                options={outlets}
                label={translate('outlet')}
                helperText={errors.outlets?.message}
                error={Boolean(errors.outlets)}
                placeholder={translate('outlet')}
              />
            )}
          />
        </FormLayout>
      </Box>
      <Box
        sx={{
          display: 'flex',
          minWidth: '100%',
          justifyContent: 'flex-end',
          mt: 2,
        }}
      >
        <Button variant="outlined" sx={{ h: 10, w: 10, minWidth: 120 }} onClick={handleClose}>
          {translate('cancel')}
        </Button>
        <Button
          variant="contained"
          sx={{ h: 10, w: 10, minWidth: 120, ml: 2 }}
          onClick={handleSubmit(onSubmit)}
        >
          {translate('save')}
        </Button>
      </Box>
    </Drawer>
  );
}
