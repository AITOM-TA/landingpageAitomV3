// Correspondance des slugs d'articles entre le français (racine /blog) et
// l'anglais US (/en/blog). Sert aux balises hreflang et au sélecteur de langue.
export const BLOG_ALTERNATES: { fr: string; en: string }[] = [
  { fr: 'standard-telephonique-ia-guide', en: 'ai-answering-service-guide' },
  { fr: 'permanence-telephonique-tarifs', en: 'answering-service-cost' },
  { fr: 'message-accueil-telephonique-exemples', en: 'phone-greeting-examples' },
  { fr: 'accueil-telephonique-professionnel', en: 'professional-call-answering' },
  { fr: 'telesecretariat-medical', en: 'medical-answering-service' },
  { fr: 'callbot-voicebot-agent-vocal', en: 'callbot-voicebot-ai-voice-agent' },
  { fr: 'standard-telephonique-externalise', en: 'outsourced-answering-service' },
  { fr: 'avocats-notaires-permanence', en: 'answering-service-law-firms' },
];

/** Renvoie la paire de slugs correspondant à un slug donné dans sa langue. */
export function altPair(slug: string, lang: 'fr' | 'en') {
  return BLOG_ALTERNATES.find((p) => p[lang] === slug);
}
