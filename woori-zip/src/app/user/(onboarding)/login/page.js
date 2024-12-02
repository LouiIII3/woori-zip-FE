'use client';

import React, { Suspense } from 'react';
import LoginContent from '@/components/domains/user/login/LoginContent';

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

export default Page;
