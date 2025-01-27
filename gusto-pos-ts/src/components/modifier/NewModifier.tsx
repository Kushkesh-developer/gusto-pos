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
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import { Button } from '@mui/material';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { useDrawerContext } from '@/context/DrawerProvider';
import { outlets } from '@/mock/common';

type EditType = {
  modifier?: string;
  groups?: string;
  outlet?: string;
  cost?: string;
};

type NewModifierProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?: boolean;
  edit?: EditType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface FormData {
  name: string;
  groups: string;
  outlet: string;
  cost: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
    groups: z.string().min(1, translate('selecting_groups_is_mandatory')),
    outlet: z
      .string()
      .min(1, translate('outlet_is_required')) // Enforce non-empty
      .refine((value) => value !== '', translate('outlet_is_required')),
    cost: z.string().min(1, translate('cost_is_required')),
  });
};

export default function NewModifier({ open, onClose, formTitle, edit, setEdit }: NewModifierProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      groups: '',
      name: '',
      outlet: '',
      cost: '',
    },
  });

  // Reset form when the `edit` data changes
  useEffect(() => {
    reset({
      groups: edit?.groups || '',
      name: edit?.modifier || '',
      outlet: edit?.outlet || '',
      cost: edit?.cost || '',
    });
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleClose = () => {
    reset({
      groups: edit?.groups || '',
      name: edit?.modifier || '',
      outlet: edit?.outlet || '', // Make sure it's an empty string if `edit?.outlet` is null
      cost: edit?.cost || '',
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
        <FormLayout cardHeading={translate('modifier_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('name')}
                helperText={errors.name?.message}
                error={Boolean(errors.name)}
                placeholder={translate('enter_name')}
              />
            )}
          />
          <Controller
            control={control}
            name="groups"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                requiredMark
                label={translate('groups')}
                options={[
                  { value: 'hot', label: 'hot' },
                  { value: 'cold', label: 'cold' },
                ]}
                helperText={errors.groups?.message}
                error={Boolean(errors.groups)}
                placeholder={translate('select_the_group')}
              />
            )}
          />
          <Controller
            control={control}
            name="outlet"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                requiredMark
                label={translate('outlet')}
                value={field.value ?? ''}
                options={[{ label: translate('select_outlet'), value: '' }, ...outlets]}
                helperText={errors.outlet?.message}
                error={Boolean(errors.outlet)}
                placeholder={translate('select_the_outlet')}
              />
            )}
          />
          <Controller
            control={control}
            name="cost"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('cost')}
                helperText={errors.cost?.message}
                error={Boolean(errors.cost)}
                placeholder={translate('enter_cost')}
              />
            )}
          />
        </FormLayout>
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
      </Box>
    </Drawer>
  );
}
