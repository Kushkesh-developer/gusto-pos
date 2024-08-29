"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import TextInput from "../widgets/inputs/GSTextInput";
import FormLayout from "../widgets/inputs/GSFormCardLayout";
import SelectInput from "../widgets/inputs/GSSelectInput";

// Zod schema generation function
const generateZodSchema = () => {
  return z.object({
    gender: z.string().min(1, "Gender is required"),
    name: z.string().min(1, "Customer Name is required"),
    phoneNumber: z.string().min(1, "Phone Number is required"),
    email: z.string().email("Invalid email address"),
    customerGroup: z.string().min(1, "Customer Group is required"),
    dateOfBirth: z.date().min(new Date(), "Date of Birth is required"),
  });
};

const CustomerForm: React.FC = () => {
  const schema = generateZodSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      gender: "Male",
      name: "",
      phoneNumber: "",
      email: "",
      customerGroup: "",
      dateOfBirth: null,
    },
  });

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <FormLayout heading="Customer Details" onSubmit={handleSubmit(onSubmit)}>
      <React.Fragment>
        <SelectInput
          id="gender"
          label="Gender"
          options={["Male", "Female", "Other"]}
          register={register}
          error={errors.gender?.message}
        />
        <TextInput
          id="name"
          label="Customer Name"
          register={register}
          error={errors.name?.message}
        />
      </React.Fragment>
      <React.Fragment>
        <TextInput
          id="phoneNumber"
          label="Phone Number"
          register={register}
          error={errors.phoneNumber?.message}
        />
        <TextInput
          id="email"
          label="Email"
          register={register}
          error={errors.email?.message}
        />
      </React.Fragment>
      <React.Fragment>
        <TextInput
          id="customerGroup"
          label="Customer Group"
          register={register}
          error={errors.customerGroup?.message}
        />
      </React.Fragment>
    </FormLayout>
  );
};

export default CustomerForm;
