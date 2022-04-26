import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Form, TextField } from 'datocms-react-ui';
import { useCallback, useState } from 'react';

type PropTypes = {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
};
// this is how we want to save our settings
type Parameters = {
  entity_path: string;
};

export function SlugConfigScreen({ ctx }: PropTypes) {
  const errors = ctx.errors as Partial<Record<string, string>>;
  const [formValues, setFormValues] = useState<Partial<Parameters>>(
    ctx.parameters,
  );

  const update = useCallback(
    (field, value) => {
      const newParameters = { ...formValues, [field]: value };
      setFormValues(newParameters);
      ctx.setParameters(newParameters);
    },
    [formValues, ctx],
  );

  return (
    <Canvas ctx={ctx}>
      <Form>
        <TextField
          id="entity_path"
          name="entity_path"
          label="Entity path"
          required
          value={formValues.entity_path ?? ''}
          error={errors.entity_path}
          onChange={(newValue: string) => update('entity_path', newValue)}
        />
      </Form>
    </Canvas>
  );
}
