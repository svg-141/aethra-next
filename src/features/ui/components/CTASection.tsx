"use client";

import React from 'react';
import Link from 'next/link';
import { encryptUrlPath } from '../../../security/url-encryption';

export default function CTASection() {
  return (
    <div className="py-12 theme-bg-surface">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-theme-primary sm:text-4xl">
          Lleva tu experiencia de juego al siguiente nivel.
        </h2>
        <p className="mt-4 text-lg text-theme-secondary">
          Descubre guías, foros, IA avanzada y personaliza tu aventura en Aethra.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href={encryptUrlPath("/login")} className="theme-button px-8 py-4 text-lg font-bold">
            Explorar Aethra Ahora
          </Link>
          <Link href={encryptUrlPath("/guide/ia-features")} className="theme-button-secondary px-8 py-4 text-lg font-bold">
            Conoce la IA
          </Link>
        </div>
      </div>
    </div>
  );
}
