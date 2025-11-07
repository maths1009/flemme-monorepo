import { Body, Container, Head, Html, Preview, Section, Tailwind, Text } from '@react-email/components';
import type React from 'react';
import type { EmailTemplateProps } from './types';

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ children, title = 'Flemme', previewText }) => {
  const backgroundColor = '#ffffff';
  const textColor = '#1f2937';
  const accentColor = '#3b82f6';
  return (
    <Html>
      <Head>
        <title>{title}</title>
        <meta content="light dark" name="color-scheme" />
        <meta content="light dark" name="supported-color-schemes" />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor,
            color: textColor,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            margin: 0,
            padding: 0,
          }}
        >
          <Container
            style={{
              margin: '0 auto',
              maxWidth: '600px',
              padding: '20px',
            }}
          >
            {/* Header */}
            <Section
              style={{
                borderBottom: `2px solid ${accentColor}`,
                padding: '20px 0',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: accentColor,
                  fontSize: '28px',
                  fontWeight: 'bold',
                  margin: 0,
                }}
              >
                {title}
              </Text>
            </Section>

            {/* Content */}
            <Section
              style={{
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                margin: '20px 0',
                padding: '40px 20px',
              }}
            >
              {children}
            </Section>

            {/* Footer */}
            <Section
              style={{
                borderTop: `1px solid #e5e7eb`,
                padding: '20px 0',
                textAlign: 'center',
              }}
            >
              <Text
                style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  margin: '0 0 10px 0',
                }}
              >
                © 2025 {title}. Tous droits réservés.
              </Text>
              <Text
                style={{
                  color: '#9ca3af',
                  fontSize: '12px',
                  margin: 0,
                }}
              >
                Cet email a été envoyé automatiquement. Veuillez ne pas y répondre.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
