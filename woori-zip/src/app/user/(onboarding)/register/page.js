'use client'

import React, { Suspense } from 'react';
import Agreement from '@/components/domains/user/agreement/AgreementPage';
import RegeterIntro from '@/components/domains/user/registerIntro/RegeterIntro';

function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Agreement />
    </Suspense>
  );
}

export default RegisterPage;
