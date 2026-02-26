import { Text } from '@react-email/components';
import type React from 'react';
import { EmailTemplate } from '../common/template';

interface EmailVerificationEmailProps {
  userName: string;
  verificationCode: number;
}

const EmailVerificationEmail: React.FC<EmailVerificationEmailProps> = ({ userName, verificationCode }) => {
  return (
    <EmailTemplate previewText={`Votre code de vérification est ${verificationCode}`} title="Flemme">
      <Text className="font-serif text-[28px] font-bold mb-6 text-black tracking-tight leading-tight">
        Vérifiez votre email 🔒
      </Text>

      <Text className="text-base leading-relaxed mb-4 text-black">
        Bonjour <span className="font-bold">{userName}</span>,
      </Text>

      <Text className="text-base leading-relaxed mb-8 text-black">
        Afin de vérifier votre adresse email et de sécuriser votre compte Flemme, veuillez utiliser le code de
        vérification ci-dessous :
      </Text>

      <div className="bg-brand-yellow border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl my-8 mx-auto p-6 max-w-[300px] text-center">
        <Text className="text-black text-4xl font-black tracking-[12px] m-0">{verificationCode}</Text>
      </div>

      <Text className="text-gray-500 text-sm leading-relaxed mt-8 pt-6 border-t-[3px] border-black">
        Si vous n'avez pas demandé ce code, vous pouvez ignorer cet email en toute sécurité.
      </Text>
    </EmailTemplate>
  );
};

export default EmailVerificationEmail;
export { EmailVerificationEmail };
