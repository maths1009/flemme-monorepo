import { LegalPageTemplate } from '@/components/LegalPageTemplate';
import { RichTextRenderer } from '@/components/RichTextRenderer';

const CGV_CONTENT = `
<h2>1. Objet et champ d’application</h2>
<p>Les présentes Conditions Générales de Vente régissent les relations contractuelles entre la plateforme Flemme et ses utilisateurs (les "Flemmards" et les "Motivés"). Elles s'appliquent à toute transaction financière réalisée via l'application, qu'il s'agisse de commissions sur services ou de souscriptions à des offres premium.</p>

<h2>2. Description des services et flux financiers</h2>
<p>Flemme opère selon un modèle biface mettant en relation l'offre et la demande de micro-services de proximité.</p>
<ul>
  <li><strong>Missions de micro-services :</strong> Les échanges portent sur des tâches du quotidien (ménage, sorties d'animaux, jardinage, etc.).</li>
  <li><strong>Modèle Freemium :</strong> L'accès à la plateforme et aux fonctionnalités de base est gratuit.</li>
  <li><strong>Options Premium :</strong> Des services payants (statut "Super Motivé", mise en avant d'annonces, filtres avancés) sont proposés via abonnement ou achat ponctuel.</li>
</ul>

<h2>3. Tarifs et commissions</h2>
<ul>
  <li><strong>Commission sur transaction :</strong> Flemme prélève une commission moyenne de 15% sur chaque échange rémunéré entre utilisateurs.</li>
  <li><strong>Abonnements premium :</strong> L'offre "Flemme Premium" est proposée au tarif de 5,99 € / mois.</li>
  <li><strong>Panier moyen :</strong> Le montant des missions est librement fixé par les utilisateurs, avec un panier moyen estimé à environ 20 €.</li>
  <li><strong>TVA :</strong> Les tarifs indiqués sur la plateforme sont exprimés en euros et TTC (Toutes Taxes Comprises).</li>
</ul>

<h2>4. Modalités de paiement et sécurisation</h2>
<p>Les paiements sont effectués directement via l'interface sécurisée de l'application.</p>
<ul>
  <li>Flemme utilise des mécanismes de paiements sécurisés pour garantir la fiabilité des échanges financiers entre les membres.</li>
  <li>Le versement des fonds au "Motivé" (l'offreur) n'intervient qu'après validation de la réalisation du service par le "Flemmard" (le demandeur).</li>
</ul>

<h2>5. Droit de rétractation et annulation</h2>
<ul>
  <li><strong>Abonnements :</strong> Conformément à la législation, l'utilisateur dispose d'un délai de 14 jours pour se rétracter de son abonnement Premium, sauf si le service a été pleinement consommé avant la fin de ce délai.</li>
  <li><strong>Annulation de mission :</strong> Les conditions d'annulation d'une prestation entre particuliers sont définies dans l'application pour limiter les désagréments, tout en favorisant la flexibilité propre à la "Lazy Economy".</li>
</ul>

<h2>6. Engagements RSE et responsabilité</h2>
<ul>
  <li><strong>Sobriété numérique :</strong> Flemme s'engage à limiter les flux énergivores et à privilégier une communication digitale responsable.</li>
  <li><strong>Impact Local :</strong> La plateforme encourage la réduction des déplacements en privilégiant les services de stricte proximité.</li>
  <li><strong>Statut des utilisateurs :</strong> Flemme agit en tant qu'intermédiaire technique. Il appartient aux utilisateurs "Motivés" de respecter leurs obligations légales et fiscales liées aux compléments de revenus générés.</li>
</ul>

<h2>7. Résolution des litiges et médiation</h2>
<p>En cas de conflit sur une prestation, Flemme propose un système de modération et s'appuie sur les notations et avis des profils vérifiés pour trancher.</p>
<p>Toute réclamation relative à une transaction doit être adressée au support client via l'outil CRM de l'application.</p>
<p>Le droit applicable est le droit français.</p>
`;

export function CGVPage() {
  return (
    <LegalPageTemplate lastUpdated={new Date()} title="Conditions Générales de Vente">
      <RichTextRenderer content={CGV_CONTENT} />
    </LegalPageTemplate>
  );
}
