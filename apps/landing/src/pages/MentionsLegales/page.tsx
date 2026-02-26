import { LegalPageTemplate } from '@/components/LegalPageTemplate';
import { RichTextRenderer } from '@/components/RichTextRenderer';

const MENTIONS_LEGALES_CONTENT = `
<p>Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique (L.C.E.N.), nous portons à la connaissance des utilisateurs et visiteurs du site et de l'application Flemme les informations suivantes :</p>

<h2>1. Éditeur de la plateforme</h2>
<ul>
  <li><strong>Dénomination sociale :</strong> Flemme</li>
  <li><strong>Forme juridique :</strong> SAS au capital de 5 000 €</li>
  <li><strong>Siège social :</strong> Angers</li>
  <li><strong>Responsable de la publication :</strong> Le Fondateur, Responsable Marketing</li>
  <li><strong>Contact :</strong> hello@flemme.life</li>
</ul>

<h2>2. Hébergement</h2>
<ul>
  <li><strong>Hébergeur :</strong> Hostinger</li>
  <li><strong>Engagement RSE :</strong> Conformément à notre politique de sobriété numérique, la plateforme privilégie des solutions d'hébergement éco-responsables pour limiter son empreinte carbone.</li>
</ul>

<h2>3. Activité et services</h2>
<p>La plateforme Flemme est une place de marché (marketplace) biface mettant en relation :</p>
<ul>
  <li>Des "Flemmards" (Demandeurs) : utilisateurs souhaitant déléguer des corvées du quotidien.</li>
  <li>Des "Motivés" (Offreurs) : utilisateurs proposant leurs services pour générer un complément de revenu ou renforcer le lien social.</li>
</ul>
<p><strong>Modèle économique :</strong> L'accès de base est gratuit (modèle freemium). L'éditeur perçoit une commission de 15% sur les transactions réalisées entre utilisateurs, ainsi que des revenus issus d'abonnements premium ("Flemme Premium") et de partenariats locaux.</p>

<h2>Propriété intellectuelle</h2>
<p>L'ensemble des éléments constituant la plateforme (logos, textes, interface ludique, charte graphique décalée) est la propriété exclusive de Flemme. Toute reproduction ou représentation, totale ou partielle, sans l'autorisation expresse de l'éditeur est interdite.</p>

<h2>Protection des données personnelles (RGPD)</h2>
<p>Conformément aux réglementations en vigueur, Flemme assure une conformité stricte au RGPD pour la gestion des données de ses utilisateurs.</p>
<ul>
  <li><strong>Finalités :</strong> Gestion des profils vérifiés, sécurisation des paiements, animation de la communauté via CRM et notifications push.</li>
  <li><strong>Droit des utilisateurs :</strong> Chaque utilisateur dispose d'un droit d'accès, de rectification et de suppression de ses données via les paramètres de l'application.</li>
</ul>

<h2>Responsabilité et sécurité</h2>
<p><strong>Confiance et vérification :</strong> Bien que Flemme mette en place des mécanismes de confiance (profils vérifiés, système de notation), l'éditeur agit en tant qu'intermédiaire technique et ne saurait être tenu responsable des litiges directs entre particuliers n'ayant pas fait l'objet d'un signalement préalable.</p>
<p><strong>Sécurité :</strong> La plateforme utilise des protocoles de paiement sécurisés pour protéger les transactions financières entre les membres.</p>

<h2>Droit applicable</h2>
<p>Les présentes mentions légales sont soumises au droit français. En cas de litige, et après échec de toute tentative de solution amiable, les tribunaux français seront seuls compétents.</p>
`;

export function MentionsLegalesPage() {
  return (
    <LegalPageTemplate lastUpdated={new Date()} title="Mentions Légales">
      <RichTextRenderer content={MENTIONS_LEGALES_CONTENT} />
    </LegalPageTemplate>
  );
}
