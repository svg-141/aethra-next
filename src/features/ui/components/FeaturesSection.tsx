"use client";

import React from 'react';
import { LANDING_PAGE_FEATURES } from '../constants/ui-constants';

export default function FeaturesSection() {
  return (
    <div className="py-12 theme-bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-theme-primary sm:text-4xl">
            Todo lo que necesitas para ser un profesional
          </h2>
          <p className="mt-4 text-lg text-theme-secondary">
            Aethra te proporciona las herramientas y la comunidad para que alcances tu máximo potencial.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LANDING_PAGE_FEATURES.map((feature, index) => (
            <div key={index} className="theme-card p-6 text-center">
              <div className="text-4xl text-theme-primary mb-4">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-theme-primary mb-2">{feature.title}</h3>
              <p className="text-theme-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
