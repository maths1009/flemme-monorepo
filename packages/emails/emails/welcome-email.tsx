import { Text } from '@react-email/components';
import type React from 'react';
import { Button } from '../common/Button';
import { EmailTemplate } from '../common/template';

interface WelcomeEmailProps {
  userName: string;
  confirmationUrl: string;
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, confirmationUrl }) => {
  return (
    <EmailTemplate previewText={`Bienvenue ${userName} ! Confirmez votre compte pour commencer.`} title="Flemme">
      <Text className="font-serif text-[28px] font-bold mb-6 text-black tracking-tight leading-tight">
        Bienvenue sur Flemme ! 🎉
      </Text>

      <Text className="text-base leading-relaxed mb-4 text-black">
        Salut <span className="font-bold">{userName}</span>,
      </Text>

      <Text className="text-base leading-relaxed mb-8 text-black">
        Nous sommes ravis de vous accueillir sur Flemme ! Votre compte a été créé avec succès. Pour commencer à utiliser
        notre plateforme, veuillez confirmer votre adresse email ci-dessous :
      </Text>

      <Button
        className="bg-brand-green text-white border-black text-lg py-4 block max-w-max mx-auto"
        href={confirmationUrl}
      >
        Confirmer mon compte
      </Button>

      <Text className="text-gray-500 text-sm leading-relaxed mt-8 pt-6 border-t-[3px] border-black">
        Si vous n'avez pas créé de compte sur Flemme, vous pouvez ignorer cet email. Ce lien de confirmation expirera
        dans 24 heures.
      </Text>
    </EmailTemplate>
  );
};

export default WelcomeEmail;
export { WelcomeEmail };
