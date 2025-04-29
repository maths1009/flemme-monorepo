import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import React from 'react';
import { EmailTemplateProps } from './types';

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  children,
  title = 'Flemme',
  previewText,
}) => {
  const backgroundColor = '#ffffff';
  const textColor = '#1f2937';
  const accentColor = '#3b82f6';
  return (
    <Html>
      <Head>
        <title>{title}</title>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body
          style={{
            backgroundColor,
            color: textColor,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            margin: 0,
            padding: 0,
          }}
        >
          <Container
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              padding: '20px',
            }}
          >
            {/* Header */}
            <Section
              style={{
                textAlign: 'center',
                padding: '20px 0',
                borderBottom: `2px solid ${accentColor}`,
              }}
            >
              <Text
                style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: accentColor,
                  margin: 0,
                }}
              >
                {title}
              </Text>
            </Section>

            {/* Content */}
            <Section
              style={{
                padding: '40px 20px',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                margin: '20px 0',
              }}
            >
              {children}
            </Section>

            {/* Footer */}
            <Section
              style={{
                textAlign: 'center',
                padding: '20px 0',
                borderTop: `1px solid #e5e7eb`,
              }}
            >
              <Text
                style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0 0 10px 0',
                }}
              >
                © 2025 {title}. Tous droits réservés.
              </Text>
              <Text
                style={{
                  fontSize: '12px',
                  color: '#9ca3af',
                  margin: 0,
                }}
              >
                Cet email a été envoyé automatiquement. Veuillez ne pas y
                répondre.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
