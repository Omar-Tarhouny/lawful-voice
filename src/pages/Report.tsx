import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CrimeReportForm } from '@/components/report/CrimeReportForm';

const Report = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <CrimeReportForm />
      </div>
      <Footer />
    </div>
  );
};

export default Report;