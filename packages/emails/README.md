# @flemme/emails

Package pour la gestion des templates d'emails avec React Email.

## Installation

```bash
pnpm add @flemme/emails
```

## Utilisation

### Template de base

Le composant `EmailTemplate` fournit une structure générique pour tous vos emails :

```tsx
import { EmailTemplate } from '@flemme/emails';

const MyEmail = () => (
  <EmailTemplate
    title="Mon Application"
    previewText="Aperçu de l'email"
    accentColor="#3b82f6"
  >
    <Text>Votre contenu personnalisé ici</Text>
  </EmailTemplate>
);
```

### Props du template

- `children`: Le contenu de l'email (obligatoire)
- `title`: Le titre de l'application (défaut: "Flemme")
- `previewText`: Le texte d'aperçu de l'email
- `backgroundColor`: Couleur de fond (défaut: "#ffffff")
- `textColor`: Couleur du texte (défaut: "#1f2937")
- `accentColor`: Couleur d'accent (défaut: "#3b82f6")

### Exemples prêts à l'emploi

#### Email de bienvenue

```tsx
import { WelcomeEmail } from '@flemme/emails';

const email = (
  <WelcomeEmail
    userName="John Doe"
    confirmationUrl="https://example.com/confirm?token=abc123"
  />
);
```

#### Email de réinitialisation de mot de passe

```tsx
import { ResetPasswordEmail } from '@flemme/emails';

const email = (
  <ResetPasswordEmail
    userName="John Doe"
    resetUrl="https://example.com/reset?token=abc123"
  />
);
```

### Rendu en HTML

Pour convertir vos templates React en HTML :

```tsx
import { render } from '@react-email/render';
import { WelcomeEmail } from '@flemme/emails';

const emailHtml = render(
  <WelcomeEmail
    userName="John Doe"
    confirmationUrl="https://example.com/confirm?token=abc123"
  />,
);
```

## Développement

```bash
# Installation des dépendances
pnpm install

# Build du package
pnpm build

# Mode développement avec watch
pnpm dev

# Vérification des types
pnpm type-check
```
