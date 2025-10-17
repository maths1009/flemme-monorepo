import { Button, Hr, Text } from '@react-email/components';
import type React from 'react';
import { EmailTemplate } from '../common/template';

interface WelcomeEmailProps {
  userName: string;
  confirmationUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, confirmationUrl }) => {
  return (
    <EmailTemplate previewText={`Bienvenue ${userName} ! Confirmez votre compte pour commencer.`} title="Flemme">
      <Text style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Bienvenue sur Flemme ! 🎉</Text>

      <Text style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>Salut {userName},</Text>

      <Text style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>
        Nous sommes ravis de vous accueillir sur Flemme ! Votre compte a été créé avec succès. Pour commencer à utiliser
        notre plateforme, veuillez confirmer votre adresse email.
      </Text>

      <Button
        href={confirmationUrl}
        style={{
          backgroundColor: '#3b82f6',
          borderRadius: '6px',
          color: '#ffffff',
          fontSize: '16px',
          fontWeight: 'bold',
          padding: '12px 24px',
          textDecoration: 'none',
        }}
      >
        Confirmer mon compte
      </Button>

      <Hr style={{ margin: '30px 0' }} />

      <Text style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
        Si vous n'avez pas créé de compte sur Flemme, vous pouvez ignorer cet email. Ce lien de confirmation expirera
        dans 24 heures.
      </Text>
    </EmailTemplate>
  );
};
