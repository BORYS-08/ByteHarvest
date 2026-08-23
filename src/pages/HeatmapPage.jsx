import React from 'react';
import { OutbreakMap } from '../components/official/OutbreakMap';
import { TimelineSlider } from '../components/official/TimelineSlider';

export const HeatmapPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <OutbreakMap />
      <TimelineSlider />
    </div>
  );
};
