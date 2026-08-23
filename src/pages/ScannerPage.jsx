import React from 'react';

import { AiScannerHud } from '../components/farmer/AiScannerHud';
import { WeatherRiskWidget } from '../components/farmer/WeatherRiskWidget';

export const ScannerPage = () => {
  return (
    <div className="w-full space-y-6 sm:space-y-8 pb-10 sm:pb-12">

      {/* ======================================================
          AI SCANNER
      ======================================================= */}

      <section className="w-full">
        <AiScannerHud />
      </section>


      {/* ======================================================
          WEATHER RISK
      ======================================================= */}

      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <WeatherRiskWidget />
      </section>

    </div>
  );
};

export default ScannerPage;