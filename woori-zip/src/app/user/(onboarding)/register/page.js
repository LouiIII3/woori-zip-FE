'use client';

import React, { Suspense } from 'react';
import RegisterContent from '@/components/domains/user/register/RegisterContent';

function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}

export default RegisterPage;
