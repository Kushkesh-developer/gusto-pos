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
import { FormControlLabel, Button } from '@mui/material';
import GSDateInput from '@/components/widgets/inputs/GSDateInput';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import { timeSlots } from '@/mock/discount';
import GSSelectInput from '@/components/widgets/inputs/GSSelectInput';
import dayjs, { Dayjs } from 'dayjs';
import GSCustomStackLayout from '@/components/widgets/inputs/GSCustomStackLayout';
import GSImageUpload from '@/components/widgets/image/GSImageUpload';
import PageHeader from '@/components/widgets/headers/PageHeader';
import { UserRecord } from '@/types/table-types';
import { useDrawerContext } from '@/context/DrawerProvider';

type EditType = {
  id?: string | number;
  name?: string;
  phone?: string;
  email?: string;
  role?: string;
  [key: string]: unknown;
  unit?: string;
  logoImage?: string; // Existing image path or base64
  rewardName: string;
  pointsRequiredToClaim?: string;
};

type LoyalityDrawerProps = {
  open: boolean;
  onClose: () => void;
  formTitle: string;
  initialData?: UserRecord | null;
  editMode: boolean;
  edit?: EditType | null;
  setEdit: Dispatch<SetStateAction<EditType | null>>;
};

interface FormData {
  rewardName: string;
  pointsRequiredToClaim: string;
  terms_conditions: string;
  logoImage?: string;
  validFromDate: Dayjs;
  validToDate: Dayjs;
  validFromTime: string;
  validToTime: string;
  outlets: {
    outlet1: boolean;
    outlet2: boolean;
  };
}

const generateZodSchema = (translate: TranslateFn) => {
  return z.object({
    rewardName: z.string().min(1, translate('name_is_required')),
    Pointsrequiredtoclaim: z.string().min(1, translate('this_is_required')),
    terms_conditions: z.string().min(1, translate('terms_condition_is_required')),
    ValidFromDate: z.date().max(new Date(), translate('valid_from_date')),
    ValidToDate: z.date().max(new Date(), translate('valid_to_date')),
    ValidFromTime: z.string().min(1, translate('valid_from_time_required')),
    ValidToTime: z.string().min(1, translate('valid_to_time_required')),
    outlets: z.object({
      outlet1: z.boolean(),
      outlet2: z.boolean(),
    }),
  });
};

export default function LoyalityDrawer({
  open,
  onClose,
  formTitle,
  edit,
  setEdit,
}: LoyalityDrawerProps) {
  const { translate } = useLocalization();
  const schema = generateZodSchema(translate);
  const { drawerPosition } = useDrawerContext();
  const defaultValues = {
    rewardName: '',
    pointsRequiredToClaim: '',
    terms_conditions: '',
    validFromDate: dayjs(),
    validToDate: dayjs(),
    validFromTime: '',
    validToTime: '',
    logoImage: '',
    outlets: {
      outlet1: false,
      outlet2: false,
    },
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  // Watch the logo_image field
  const logoImage = watch('logoImage');

  useEffect(() => {
    if (edit) {
      // Populate form fields with the edit record data
      reset({
        rewardName: edit.rewardName || '',
        pointsRequiredToClaim: edit.pointsRequiredToClaim || '',
        logoImage: typeof edit.logoImage === 'string' ? edit.logoImage : '',
      });
    } else {
      // Reset form to blank values for Add mode
      reset({
        rewardName: '',
        pointsRequiredToClaim: '',
        logoImage: '',
        terms_conditions: '',
      });
    }
  }, [edit, reset]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle form submission, including the outlets data
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgData = reader.result as string;
        setValue('logoImage', imgData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (): void => {
    setValue('logoImage', '');
  };

  const handleClose = (): void => {
    reset({
      ...defaultValues,
    });
    setEdit(null);
    onClose();
  };

  return (
    <Drawer
      open={open}
      onClose={handleClose}
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
        <FormLayout cardHeading={translate('Reward_details')}>
          <Controller
            control={control}
            name="rewardName"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('name')}
                helperText={errors.rewardName?.message}
                error={Boolean(errors.rewardName)}
                placeholder={translate('name')}
              />
            )}
          />
          <Controller
            control={control}
            name="pointsRequiredToClaim"
            render={({ field }) => (
              <GSTextInput
                {...field}
                label={translate('points_required_to_claim')}
                helperText={errors.pointsRequiredToClaim?.message}
                error={Boolean(errors.pointsRequiredToClaim)}
                placeholder={translate('points_required_to_claim')}
              />
            )}
          />
          <Controller
            control={control}
            name="terms_conditions"
            render={({ field }) => (
              <GSTextInput
                {...field}
                requiredMark
                label={translate('terms_conditions')}
                helperText={errors.terms_conditions?.message}
                error={Boolean(errors.terms_conditions)}
                placeholder={translate('terms_conditions')}
              />
            )}
          />
          <Controller
            name="validFromDate"
            control={control}
            render={({ field }) => (
              <GSDateInput
                id="valid_from_date"
                {...field}
                label={translate('valid_from_date')}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <Controller
            name="validToDate"
            control={control}
            render={({ field }) => (
              <GSDateInput
                id="valid_to_date"
                {...field}
                label={translate('valid_to_date')}
                value={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <Controller
            name="validFromTime"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('valid_from_time')}
                options={timeSlots}
                placeholder={translate('valid_from_time_optional')}
              />
            )}
          />
          <Controller
            name="validToTime"
            control={control}
            render={({ field }) => (
              <GSSelectInput
                {...field}
                label={translate('valid_to_time')}
                options={timeSlots}
                placeholder={translate('valid_to_time_optional')}
              />
            )}
          />
          <GSCustomStackLayout withoutGrid>
            <GSImageUpload
              name="logoImage"
              selectedImg={logoImage}
              onClick={handleRemoveImage}
              quantity={false}
              category={false}
              onChange={handleImageUpload}
            />
          </GSCustomStackLayout>
        </FormLayout>
      </Box>
      <Box mb={5}>
        <FormLayout cardHeading={translate('apply_to_these_outlets')}>
          <Controller
            name="outlets.outlet1"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={translate('downtown')}
                />
              </FormGroup>
            )}
          />
          <Controller
            name="outlets.outlet2"
            control={control}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  }
                  label={translate('chaiChee')}
                />
              </FormGroup>
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
