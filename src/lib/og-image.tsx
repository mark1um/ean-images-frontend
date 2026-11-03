import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

type OgImageProps = {
  eyebrow: string;
  title: string;
  footer: string;
};

/** Imagem de compartilhamento (WhatsApp, LinkedIn, Google Discover) no visual do site. */
export function renderOgImage({ eyebrow, title, footer }: OgImageProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(135deg, #020617 0%, #0f172a 60%, #083344 100%)',
          color: '#f1f5f9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#06b6d4',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
              fontWeight: 700,
              color: '#020617',
            }}
          >
            E
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>EAN Images</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 26, color: '#67e8f9', textTransform: 'uppercase', letterSpacing: 3 }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: title.length > 70 ? 52 : 62, fontWeight: 700, lineHeight: 1.15 }}>{title}</div>
        </div>

        <div style={{ fontSize: 28, color: '#94a3b8' }}>{footer}</div>
      </div>
    ),
    ogSize
  );
}
