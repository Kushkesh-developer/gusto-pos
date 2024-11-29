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
import { Typography, Button } from '@mui/material';
import { UserRecord } from '@/types/table-types';
type editType={
  username?: string; 
   id?:string|number;
   email?: string;
   [key: string]: unknown; 
   group:string;
   name?: string;
   taxName?:string;
   taxRate?:string;
}
type OutletDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?:boolean;
  edit?:editType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface FormData {
  taxName: string;
  taxRate: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    taxname: z.string().min(1, translate('tax_name_is_required')),
    taxrate: z.string().min(1, translate('tax_rate_is_must')),
  });
};
export default function TerminalDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}: OutletDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      taxName: formTitle === "Edit Tax" ? (edit?.taxName || '') : '',
      taxRate: '',
    },
  });
  useEffect(() => {
    console.log("hello",formTitle,edit?.username);
    
    reset({
      taxName: formTitle === "Edit Tax" ? (edit?.taxName ?? '') : '',
      // gender: edit?.gender || 'Male',
      taxRate: edit?.taxRate || '',
    });
  }, [edit, reset]);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data); // Example of handling the data
    
  };
  const handleClose = () => {
    setEdit(null); // Reset `editMode` when closing
      onClose(); // Call the parent `onClose` function
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
      <Typography variant="h6">{translate('add_new_tax')} </Typography>
      <Box mb={5}>
        <FormLayout cardHeading={translate('tax_details')}>
          <Controller
            control={control}
            name="taxName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('tax_name')}
                helperText={errors.taxName?.message}
                error={Boolean(errors.taxName)}
                placeholder={translate('tax_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="taxRate"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('tax_rate')}
                helperText={errors.taxRate?.message}
                error={Boolean(errors.taxRate)}
                placeholder={translate('tax_rate')}
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
