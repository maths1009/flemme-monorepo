import { Text } from '@react-email/components';
import type React from 'react';
import { Button } from '../common/Button';
import { EmailTemplate } from '../common/template';

interface ResetPasswordEmailProps {
  userName: string;
  resetUrl: string;
}

const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({ userName, resetUrl }) => {
  return (
    <EmailTemplate previewText={`Réinitialisez votre mot de passe pour votre compte Flemme.`} title="Flemme">
      <Text className="font-serif text-[28px] font-bold mb-6 text-black tracking-tight leading-tight">
        Réinitialisation du mot de passe 🔑
      </Text>

      <Text className="text-base leading-relaxed mb-4 text-black">
        Bonjour <span className="font-bold">{userName}</span>,
      </Text>

      <Text className="text-base leading-relaxed mb-8 text-black">
        Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Cliquez sur le bouton
        ci-dessous pour choisir un nouveau mot de passe :
      </Text>

      <Button className="bg-brand-green text-white border-black text-lg py-4 block max-w-max mx-auto" href={resetUrl}>
        Réinitialiser mon mot de passe
      </Button>

      <Text className="text-gray-600 text-sm leading-relaxed mt-8">
        Ou copiez/collez ce lien dans votre navigateur :
        <br />
        <a className="text-brand-green font-medium underline mt-1 block break-all" href={resetUrl}>
          {resetUrl}
        </a>
      </Text>

      <Text className="text-gray-500 text-sm leading-relaxed mt-8 pt-6 border-t-[3px] border-black">
        Si vous n'avez pas demandé à réinitialiser votre mot de passe, vous pouvez ignorer cet email en toute sécurité.
      </Text>
    </EmailTemplate>
  );
};

export default ResetPasswordEmail;
export { ResetPasswordEmail };
