import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { ItemAttributes } from 'datocms-plugin-sdk/dist/types/SiteApiSchema';

import { ButtonLink, Canvas } from 'datocms-react-ui';
import { useMemo } from 'react';
import { Parameters } from './ConfigScreen';
interface Props {
  ctx: RenderFieldExtensionCtx;
}

const replaceVariables = (
  entityPath: string,
  attributes: ItemAttributes,
  locale: string | null,
) => {
  let path = entityPath ?? '';
  Object.entries(attributes).forEach(([field, value]) => {
    if (path.includes(`$${field}`)) {
      let localizedValue: string;
      if (
        typeof value === 'object' &&
        value !== null &&
        locale !== null &&
        locale in value
      ) {
        localizedValue = (value as any)[locale];
      } else {
        localizedValue = value as string;
      }
      path = path.replace(`$${field}`, localizedValue);
    }
  });
  return path;
};

export default function PreviewLink({ ctx }: Props) {
  const { siteUrl, previewPath, previewSecret } = ctx.plugin.attributes
    .parameters as Parameters;
  const multiLang = ctx.site.attributes.locales.length > 1;
  const locale = ctx.locale;
  const entityPath =
    (ctx.parameters.entity_path as string | undefined) ??
    `/${ctx.itemType.attributes.api_key}`;
  const attributes = useMemo(() => ctx.item?.attributes ?? {}, [ctx.item]);

  const previewHref = useMemo(() => {
    const path = replaceVariables(entityPath, attributes, locale);
    const noSlashInstanceUrl = siteUrl.replace(/\/$/, '');

    return [
      noSlashInstanceUrl,
      previewPath,
      '?slug=',
      multiLang ? `/${locale}` : '',
      path,
      previewSecret ? `&secret=${previewSecret}` : '',
    ].join('');
  }, [
    attributes,
    entityPath,
    locale,
    multiLang,
    previewPath,
    previewSecret,
    siteUrl,
  ]);

  return (
    <Canvas ctx={ctx}>
      {ctx.itemStatus === 'new' ? (
        'Must save the record at least once'
      ) : (
        <ButtonLink
          buttonType="primary"
          fullWidth
          href={previewHref}
          target="_blank"
        >
          View Preview
        </ButtonLink>
      )}
    </Canvas>
  );
}
