import React, { createContext, useContext, useState } from 'react';
import { Liquid, type LiquidOptions } from 'liquidjs';
import { RenderOptions } from 'liquidjs/dist/liquid-options';

type ScopeType = Parameters<Liquid['render']>[1];

export interface TemplateDataContextType {
  engine: Liquid;
  scope: ScopeType;
  renderOptions?: RenderOptions;
}

const TemplateDataContext = createContext<TemplateDataContextType | null>(null);

export const useUnsafeTemplateData = () => useContext(TemplateDataContext);

export interface TemplateDataProviderProps {
  children: React.ReactNode;
  templateScope: ScopeType;
  engineOptions?: LiquidOptions;
  renderOptions?: RenderOptions;
}

export function TemplateDataProvider({
  children,
  templateScope,
  engineOptions,
  renderOptions,
}: TemplateDataProviderProps) {
  const [engine] = useState(() => new Liquid(engineOptions));

  return (
    <TemplateDataContext.Provider value={{ engine, scope: templateScope, renderOptions }}>
      {children}
    </TemplateDataContext.Provider>
  );
}
