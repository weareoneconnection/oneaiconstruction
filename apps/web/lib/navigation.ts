import type { Dictionary } from './i18n/dictionaries';

/** Nav structure is locale-independent; only the labels come from a dictionary. */
export function primaryNav(t: Dictionary) {
  return [
    { label: t.nav.products, href: '/products' },
    { label: t.nav.solutions, href: '/solutions' },
    { label: t.nav.platform, href: '/platform' },
    { label: t.nav.integrations, href: '/integrations' },
    { label: t.nav.enterprise, href: '/enterprise' },
    { label: t.nav.customers, href: '/customers' },
    { label: t.nav.resources, href: '/resources' }
  ];
}

export function footerNav(t: Dictionary) {
  return [
    {
      heading: t.footer.products,
      links: [
        { label: t.footer.links.constructionOs, href: '/products/construction-os' },
        { label: t.footer.links.constructionTwin, href: '/products/construction-twin' },
        { label: t.footer.links.platform, href: '/platform' },
        { label: t.footer.links.integrations, href: '/integrations' },
        { label: t.footer.links.pricing, href: '/pricing' }
      ]
    },
    {
      heading: t.footer.solutions,
      links: [
        { label: t.footer.links.projectIntelligence, href: '/solutions#project-intelligence' },
        { label: t.footer.links.scheduleIntelligence, href: '/solutions#schedule-intelligence' },
        { label: t.footer.links.riskIntelligence, href: '/solutions#risk-intelligence' },
        { label: t.footer.links.constructionAgents, href: '/solutions#construction-agents' },
        { label: t.footer.links.industries, href: '/industries' }
      ]
    },
    {
      heading: t.footer.enterprise,
      links: [
        { label: t.footer.links.enterpriseControls, href: '/enterprise' },
        { label: t.footer.links.security, href: '/security' },
        { label: t.footer.links.customers, href: '/customers' },
        { label: t.footer.links.enterprisePilot, href: '/pilot' }
      ]
    },
    {
      heading: t.footer.company,
      links: [
        { label: t.footer.links.about, href: '/company' },
        { label: t.footer.links.resources, href: '/resources' },
        { label: t.footer.links.contact, href: '/contact' }
      ]
    }
  ];
}
