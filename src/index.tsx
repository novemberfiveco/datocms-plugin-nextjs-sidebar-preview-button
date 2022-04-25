import {
  connect,
  IntentCtx,
  RenderManualFieldExtensionConfigScreenCtx,
} from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import 'datocms-react-ui/styles.css';
import PreviewLink from './entrypoints/PreviewLink';
import { SlugConfigScreen } from './entrypoints/SlugConfigScreen';

connect({
  manualFieldExtensions(ctx: IntentCtx) {
    return [
      {
        id: 'preview',
        name: 'Next.js Preview Links v2',
        type: 'editor',
        fieldTypes: ['json'],
        configurable: true,
        asSidebarPanel: {
          startOpen: true,
        },
      },
    ];
  },
  validateManualFieldExtensionParameters(
    _fieldExtensionId: string,
    parameters: Record<string, any>,
  ) {
    const errors: Record<string, string> = {};
    if (!parameters.entityPath) {
      errors.entityPath = 'Please provide an entity path';
    }
    return errors;
  },
  renderManualFieldExtensionConfigScreen(
    fieldExtensionId: string,
    ctx: RenderManualFieldExtensionConfigScreenCtx,
  ) {
    return render(<SlugConfigScreen ctx={ctx} />);
  },
  renderFieldExtension(fieldExtensionId, ctx) {
    return render(<PreviewLink ctx={ctx} />);
  },
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
});
