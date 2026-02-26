import { Body, Container, Font, Head, Html, Preview, Section, Tailwind, Text } from '@react-email/components';
import type React from 'react';
import type { EmailTemplateProps } from './types';

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ children, title = 'Flemme', previewText }) => {
  return (
    <Html>
      <Head>
        <title>{title}</title>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
        <Font
          fallbackFontFamily="sans-serif"
          fontFamily="Inter"
          fontStyle="normal"
          fontWeight={400}
          webFont={{
            format: 'woff2',
            url: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf',
          }}
        />
        <Font
          fallbackFontFamily="serif"
          fontFamily="DM Serif Display"
          fontStyle="normal"
          fontWeight={400}
          webFont={{
            format: 'woff2',
            url: 'https://fonts.gstatic.com/s/dmserifdisplay/v15/xXPI1bRoMw1SCUp-RTJRaMoMUXzWPYgB.woff2',
          }}
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                'brand-bg': '#f5f4f3',
                'brand-black': '#1e1e1e',
                'brand-blue': '#405ef6cc',
                'brand-green': '#004739',
                'brand-orange': '#ff6b35',
                'brand-pink': '#fea3b2',
                'brand-yellow': '#fde104',
              },
              fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['"DM Serif Display"', 'serif'],
              },
            },
          },
        }}
      >
        <Body className="bg-brand-bg text-brand-black font-sans my-auto mx-auto px-4 py-8">
          {/* Main Card */}
          <Container className="bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl mx-auto w-full max-w-[600px] overflow-hidden">
            {/* Brutalist Header Banner */}
            <Section className="bg-brand-yellow border-b-[3px] border-black p-6 text-center">
              <Text className="text-black font-serif text-4xl mt-2 font-bold p-0 leading-none tracking-tighter">
                {title}
              </Text>
            </Section>

            {/* Content Area */}
            <Section className="px-8 pt-6 pb-8">{children}</Section>

            {/* Brutalist Footer */}
            <Section className="bg-gray-100 border-t-[3px] border-black p-6 text-center">
              <Text className="text-black text-sm font-bold tracking-wider mb-2">LA FLEMME VAINCRA.</Text>
              <Text className="text-gray-500 text-xs mt-1">
                Cet email a été envoyé automatiquement. Il est l'heure de retourner chiller.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
