import { Button, Hr, Text } from '@react-email/components';
import React from 'react';
import { EmailTemplate } from '../common/template';

interface WelcomeEmailProps {
  userName: string;
  confirmationUrl: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName,
  confirmationUrl,
}) => {
  return (
    <EmailTemplate
      title="Flemme"
      previewText={`Bienvenue ${userName} ! Confirmez votre compte pour commencer.`}
    >
      <Text
        style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}
      >
        Bienvenue sur Flemme ! 🎉
      </Text>

      <Text
        style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}
      >
        Salut {userName},
      </Text>

      <Text
        style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}
      >
        Nous sommes ravis de vous accueillir sur Flemme ! Votre compte a été
        créé avec succès. Pour commencer à utiliser notre plateforme, veuillez
        confirmer votre adresse email.
      </Text>

      <Button
        href={confirmationUrl}
        style={{
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Confirmer mon compte
      </Button>

      <Hr style={{ margin: '30px 0' }} />

      <Text style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
        Si vous n'avez pas créé de compte sur Flemme, vous pouvez ignorer cet
        email. Ce lien de confirmation expirera dans 24 heures.
      </Text>
    </EmailTemplate>
  );
};
