import React from 'react';
import { DosageCalculator } from '../components/farmer/DosageCalculator';

export const CalculatorPage = () => {
  return (
    <div className="w-full py-6 sm:py-8">
      <DosageCalculator />
    </div>
  );
};

export default CalculatorPage;