import React, { useState } from 'react';

import { TextProps, TextPropsSchema } from '@usewaypoint/block-text';
import { type ZodError } from 'zod';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import BooleanInput from './helpers/inputs/BooleanInput';
import TextInput from './helpers/inputs/TextInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type TextTemplateSidebarPanelProps = {
  data: TextProps;
  setData: (v: TextProps) => void;
};
export function TextTemplateSidebarPanel({ data, setData }: TextTemplateSidebarPanelProps) {
  const [, setErrors] = useState<ZodError | null>(null);

  const updateData = (d: unknown) => {
    const res = TextPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Text block">
      <TextInput
        label="Content"
        rows={5}
        defaultValue={data.props?.text ?? ''}
        onChange={(text) => updateData({ ...data, props: { ...data.props, text } })}
      />
      <p style={{ marginTop: '8px' }}>
        <i>
          You can use the template syntax of{' '}
          <a href="https://liquidjs.com/index.html" target="_blank">
            Liquid.js
          </a>
          .
          <br />
          You can find{' '}
          <a href="https://liquidjs.com/filters/overview.html" target="_blank">
            built-in filters/functions here
          </a>
          .
        </i>
      </p>
      <BooleanInput
        label="Markdown"
        defaultValue={data.props?.markdown ?? false}
        onChange={(markdown) => updateData({ ...data, props: { ...data.props, markdown } })}
      />

      <MultiStylePropertyPanel
        names={['color', 'backgroundColor', 'fontFamily', 'fontSize', 'fontWeight', 'textAlign', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
