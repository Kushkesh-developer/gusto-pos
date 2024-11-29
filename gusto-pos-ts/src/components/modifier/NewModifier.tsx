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
import { Button, Typography } from '@mui/material';
import { UserRecord } from '@/types/table-types';
import PageHeader from '@/components/widgets/headers/PageHeader';

type editType={
  username?: string; 
   id?:string|number;
   email?: string;
   [key: string]: unknown; 
   group:string;
   name?: string;
   groups?:string;
}
type NewModifierProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode?:boolean;
  edit?:editType;
  setEdit: Dispatch<SetStateAction<UserRecord | null>>;
};

interface FormData {
  name: string;
  groups: string;
  parent: string;
  cost: string;
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    name: z.string().min(1, translate('name_is_required')),
    groups: z.string().min(1, translate('selecting_groups_is_mandatory')),
    parent: z.string().min(1, translate('selecting_parent_is_mandatory')),
    cost: z.string().min(1, translate('cost_is_required')),
  });
};
export default function NewModifier({
  open,
  onClose,
  formTitle,
  edit,
  setEdit
}: NewModifierProps) {
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
      groups:'hot',
      name: formTitle === "Edit Modifier" ? (edit?.groups || '') : '',
      
      parent: '',
      cost: '',
    },
  });
  useEffect(() => {
    reset({
      // gender: edit?.gender || 'Male',
   
      groups:formTitle === 'Edit Modifier' ? (edit?.groups ?? '') : '',
      
    });
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
      <PageHeader title={formTitle} hideSearch={true} />
      <Box mb={5}>
        <FormLayout cardHeading={translate('modifier_details')}>
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <GSTextInput
                {...field}
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
              {...register('groups')}
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
            name="parent"
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('parent')}
                options={[
                  { value: 'hot meat', label: 'hot meat' },
                  { value: 'cold meat', label: 'cold meat' },
                ]}
                helperText={errors.parent?.message}
                error={Boolean(errors.parent)}
                placeholder={translate('select_the_parent')}
              />
            )}
          />
          <Controller
            control={control}
            name="cost"
            render={({ field }) => (
              <GSTextInput
                {...field}
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
