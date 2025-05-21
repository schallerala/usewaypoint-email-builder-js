import React, { useState } from 'react';
import BaseSidebarPanel from './ConfigurationPanel/input-panels/helpers/BaseSidebarPanel';
import TextInput from './ConfigurationPanel/input-panels/helpers/inputs/TextInput';
import { setTemplateData, useTemplateData } from '../../documents/editor/EditorContext';

export function TemplateDataPanel() {
  const defaultData = useTemplateData();
  const [errors, setErrors] = useState<string | null>(null);

  const updateData = (d: string) => {
    try {
      const templateScope = JSON.parse(d);
      setTemplateData(templateScope);
      setErrors(null);
    } catch (e) {
      setErrors('Invalid JSON: ' + (e as Error).toString());
    }
  };

  return (
    <BaseSidebarPanel title="Test Data">
      <TextInput
        label="Content"
        rows={5}
        defaultValue={JSON.stringify(defaultData, null, 2)}
        onChange={(data) => updateData(data)}
      />
      {errors && <p style={{ color: 'red', fontWeight: 900 }}>{errors}</p>}
    </BaseSidebarPanel>
  );
}
