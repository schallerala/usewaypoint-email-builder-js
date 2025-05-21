import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';

import Reader, { TReaderDocument } from '../Reader/core';
import { TemplateDataProviderProps } from '@usewaypoint/block-text-template';

type TOptions = {
  rootBlockId: string;
} & Omit<TemplateDataProviderProps, 'children'>;

export default function renderToStaticMarkup(document: TReaderDocument, delegateOptions: TOptions) {
  return (
    '<!DOCTYPE html>' +
    baseRenderToStaticMarkup(
      <html>
        <body>
          <Reader document={document} {...delegateOptions} />
        </body>
      </html>
    )
  );
}
