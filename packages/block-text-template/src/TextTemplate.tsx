import React, { useMemo } from 'react';
import { z } from 'zod';

import {
  Text as TextBlock,
  type TextProps as TextBlockProps,
  TextPropsSchema as TextBlockPropsSchema,
  TextPropsDefaults as TextBlockPropsDefaults,
} from '@usewaypoint/block-text';
import { useUnsafeTemplateData } from './TemplateDataContext';

export const TextTemplatePropsSchema = TextBlockPropsSchema;

export type TextTemplateProps = z.infer<typeof TextTemplatePropsSchema>;

export const TextPropsDefaults = TextBlockPropsDefaults;

export function TextTemplate(delegateComponentProps: TextBlockProps) {
  const templateDataContext = useUnsafeTemplateData();

  const renderedText = useMemo(() => {
    if (!templateDataContext) {
      return delegateComponentProps.props?.text ?? TextPropsDefaults.text;
    }

    const { engine, scope, renderOptions } = templateDataContext;

    const textTemplate = delegateComponentProps.props?.text ?? TextPropsDefaults.text;

    try {
      const tpl = engine.parse(textTemplate);
      return engine.renderSync(tpl, scope, renderOptions).toString();
    } catch (e) {
      return textTemplate;
    }
  }, [templateDataContext, delegateComponentProps]);

  const delegateProps = useMemo(
    () => ({
      ...delegateComponentProps.props,
      text: renderedText,
    }),
    [delegateComponentProps, renderedText]
  );

  return <TextBlock style={delegateComponentProps.style} props={delegateProps} />;
}
