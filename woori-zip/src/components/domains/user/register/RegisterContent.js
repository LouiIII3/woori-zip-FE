'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Agreement from '@/components/domains/user/agreement/AgreementPage';

function RegisterContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || null;

  return <Agreement role={role} />;
}

export default RegisterContent;
