import BusinessInfo from '@/components/settings/BusinessInfo';
import PageHeader from '@/components/widgets/headers/PageHeader';
import React from 'react';

const Page = () => {
  return (
    <div>
      <PageHeader title="Business Info" hideSearch={true} />
      <BusinessInfo />
    </div>);

};

export default Page;