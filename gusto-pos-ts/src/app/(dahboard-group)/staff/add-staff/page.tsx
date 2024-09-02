
import CustomerForm from "@/components/customer/CustomerForm";
import PageHeader from "@/components/widgets/headers/PageHeader";

import React from "react";

export default function Home() {
  return (
    <>
      <PageHeader title={"Add Customer"} hideSearch={true} />
      <CustomerForm />
    </>
  );
}
