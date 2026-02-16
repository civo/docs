import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

const footerColumns = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: 'https://www.civo.com/about' },
      { label: 'Pricing', href: 'https://www.civo.com/pricing' },
      { label: 'Case studies', href: 'https://www.civo.com/case-studies' },
      { label: 'Navigate Events', href: 'https://www.civo.com/navigate' },
      { label: 'White Papers', href: 'https://www.civo.com/white-papers' },
      { label: 'Newsroom', href: 'https://www.civo.com/newsroom' },
      { label: 'Brand Assets', href: 'https://www.civo.com/brand-assets' },
      { label: 'Careers', href: 'https://careers.civo.com/' },
      { label: 'Tech Junction', href: 'https://www.civo.com/tech-junction' },
      { label: 'Partners', href: 'https://www.civo.com/partners' },
    ],
  },
  {
    title: 'Public Cloud',
    links: [
      { label: 'Kubernetes', href: 'https://www.civo.com/public-cloud/kubernetes' },
      { label: 'Compute', href: 'https://www.civo.com/public-cloud/compute' },
      { label: 'Pricing', href: 'https://www.civo.com/pricing' },
      { label: 'Databases', href: 'https://www.civo.com/databases' },
      { label: 'Load balancers', href: 'https://www.civo.com/load-balancers' },
      { label: 'Block storage', href: 'https://www.civo.com/features/block-storage' },
    ],
  },
  {
    title: 'Private Cloud',
    links: [
      { label: 'CivoStack Enterprise', href: 'https://www.civo.com/civostack-enterprise' },
      { label: 'FlexCore', href: 'https://www.civo.com/flexcore' },
      { label: 'VMware for service providers', href: 'https://www.civo.com/vmware-service-providers' },
      { label: 'VMware alternative', href: 'https://www.civo.com/vmware-alternative' },
      { label: 'VMware migration', href: 'https://www.civo.com/vmware-migration-tool' },
      { label: 'UK Sovereign Cloud', href: 'https://www.civo.com/uk-sovereign-cloud' },
      { label: 'India Sovereign Cloud', href: 'https://www.civo.com/india' },
    ],
  },
  {
    title: 'Civo AI',
    links: [
      { label: 'Cloud GPU', href: 'https://www.civo.com/ai/cloud-gpu' },
      { label: 'Kubernetes GPU', href: 'https://www.civo.com/ai/kubernetes' },
      { label: 'Compute GPU', href: 'https://www.civo.com/ai/compute' },
      { label: 'relaxAI', href: 'https://www.relax.ai/' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Research', href: 'https://www.civo.com/research' },
      { label: 'Blockchain', href: 'https://www.civo.com/blockchain' },
      { label: 'Financial services', href: 'https://www.civo.com/finance' },
      { label: 'Government', href: 'https://www.civo.com/government' },
      { label: 'SaaS', href: 'https://www.civo.com/saas' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Ambassadors', href: 'https://www.civo.com/ambassadors' },
      { label: 'API documentation', href: 'https://www.civo.com/api' },
      { label: 'Blog', href: 'https://www.civo.com/blog' },
      { label: 'Civo Documentation', href: 'https://www.civo.com/docs' },
      { label: 'Civo Academy', href: 'https://www.civo.com/academy' },
      { label: 'Civo GitHub repo', href: 'https://github.com/civo' },
      { label: 'Civo marketplace', href: 'https://www.civo.com/marketplace' },
      { label: 'Meetups', href: 'https://www.civo.com/meetups' },
      { label: 'Tutorials', href: 'https://www.civo.com/learn' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Support', href: 'https://www.civo.com/contact' },
      { label: 'Sales inquiries', href: 'https://www.civo.com/sales' },
      { label: 'Status', href: 'https://status.civo.com' },
    ],
  },
];

const socialIcons = {
  Instagram: (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C8.39664 0 9.59486 0.000245758 10.458 0.571289C10.8435 0.826325 11.1737 1.15655 11.4287 1.54199C11.9998 2.40514 12 3.60336 12 6C12 8.39664 11.9998 9.59486 11.4287 10.458C11.1737 10.8435 10.8435 11.1737 10.458 11.4287C9.59486 11.9998 8.39664 12 6 12C3.60336 12 2.40514 11.9998 1.54199 11.4287C1.15655 11.1737 0.826325 10.8435 0.571289 10.458C0.000245758 9.59486 0 8.39664 0 6C0 3.60336 0.000245908 2.40514 0.571289 1.54199C0.826325 1.15655 1.15655 0.826325 1.54199 0.571289C2.40514 0.000245908 3.60336 0 6 0ZM6 2.89355C4.2845 2.89355 2.89364 4.28452 2.89355 6C2.89355 7.71555 4.28445 9.10645 6 9.10645C7.7155 9.10639 9.10645 7.71551 9.10645 6C9.10636 4.28456 7.71545 2.89361 6 2.89355ZM6 3.94434C7.13503 3.94439 8.05558 4.86497 8.05566 6C8.05566 7.1351 7.13508 8.05561 6 8.05566C4.86487 8.05566 3.94434 7.13513 3.94434 6C3.94442 4.86494 4.86492 3.94434 6 3.94434ZM9.22852 2.00781C8.82557 2.00799 8.49902 2.33529 8.49902 2.73828C8.49927 3.14106 8.82572 3.46759 9.22852 3.46777C9.63146 3.46777 9.95873 3.14117 9.95898 2.73828C9.95898 2.33518 9.63162 2.00781 9.22852 2.00781Z" fill="currentColor"/>
    </svg>
  ),
  LinkedIn: (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1.61333C0 1.22852 0.135139 0.911059 0.405405 0.660947C0.675672 0.410823 1.02703 0.285767 1.45946 0.285767C1.88417 0.285767 2.2278 0.408895 2.49035 0.655175C2.76061 0.909143 2.89575 1.24006 2.89575 1.64796C2.89575 2.01737 2.76448 2.3252 2.50193 2.57148C2.23166 2.82545 1.87645 2.95243 1.43629 2.95243H1.42471C0.999996 2.95243 0.656375 2.82545 0.393822 2.57148C0.13127 2.31751 0 1.99812 0 1.61333ZM0.150579 11.7143V4.00294H2.72201V11.7143H0.150579ZM4.14672 11.7143H6.71815V7.40842C6.71815 7.13905 6.74904 6.93126 6.81081 6.78504C6.91891 6.52337 7.08301 6.30211 7.30309 6.12126C7.52317 5.9404 7.79922 5.84998 8.13127 5.84998C8.99614 5.84998 9.42857 6.43102 9.42857 7.59312V11.7143H12V7.29298C12 6.15397 11.7297 5.29009 11.1892 4.70135C10.6486 4.1126 9.93437 3.81823 9.04633 3.81823C8.05019 3.81823 7.27413 4.24536 6.71815 5.09962V5.12271H6.70656L6.71815 5.09962V4.00294H4.14672C4.16216 4.24921 4.16988 5.01495 4.16988 6.30019C4.16988 7.58542 4.16216 9.39013 4.14672 11.7143Z" fill="currentColor"/>
    </svg>
  ),
  X: (
    <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.14163 5.08118L11.6089 0H10.5503L6.67137 4.41192L3.57328 0H0L4.68492 6.67161L0 12H1.05866L5.15491 7.34086L8.42672 12H12L7.14163 5.08118ZM5.69165 6.73038L5.21697 6.06604L1.44011 0.779808H3.06615L6.11412 5.04597L6.5888 5.7103L10.5508 11.2557H8.92474L5.69165 6.73038Z" fill="currentColor"/>
    </svg>
  ),
  Facebook: (
    <svg width="8" height="12" viewBox="0 0 8 12" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.97593 12V6.52624H6.90573L7.19465 4.393H4.97588V3.03102C4.97588 2.4134 5.156 1.99252 6.0863 1.99252L7.27275 1.99199V0.0840478C7.06755 0.0580973 6.3632 0 5.54388 0C3.8332 0 2.66204 0.994117 2.66204 2.81982V4.393H0.727295V6.52624H2.66204V11.9999H4.97593V12Z" fill="currentColor"/>
    </svg>
  ),
  YouTube: (
    <svg width="14" height="10" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.29246 9.65328L4.58433 9.60267C3.7075 9.58503 2.82849 9.62024 1.96885 9.43752C0.661139 9.16451 0.568496 7.82591 0.471555 6.70308C0.337981 5.12452 0.389691 3.51731 0.641764 1.95192C0.784067 1.07358 1.34409 0.549465 2.21014 0.492432C5.13371 0.285448 8.07672 0.309978 10.9938 0.406543C11.3019 0.415396 11.6121 0.46378 11.9159 0.518854C13.4154 0.787466 13.452 2.3044 13.5492 3.58137C13.6461 4.87152 13.6052 6.16829 13.4199 7.44965C13.2713 8.51058 12.9868 9.40028 11.7866 9.48617C10.2828 9.59848 8.81343 9.6889 7.30536 9.66011C7.30542 9.65328 7.29676 9.65328 7.29246 9.65328ZM5.70034 6.9673C6.83361 6.30236 7.94526 5.6485 9.07205 4.98802C7.93666 4.32308 6.82713 3.66922 5.70034 3.00873V6.9673Z" fill="currentColor"/>
    </svg>
  ),
};

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/civocloud/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/civocloud' },
  { label: 'X', href: 'https://x.com/civocloud' },
  { label: 'Facebook', href: 'https://www.facebook.com/civocloud/' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UCZD2ggK3cnVD_sLMR6gUx2w?sub_confirmation=1&feature=subscribe-embed-click' },
];

const legalLinks = [
  { label: 'Legal', href: 'https://www.civo.com/legal' },
  { label: 'Terms and Conditions', href: 'https://www.civo.com/legal/terms' },
  { label: 'Privacy Policy', href: 'https://www.civo.com/legal/privacy' },
  { label: 'Cookies', href: 'https://www.civo.com/legal/cookie' },
  { label: 'Data Processing Agreement', href: 'https://www.civo.com/legal/data-processing-agreement' },
];

function FooterLinkList({ links }) {
  return (
    <ul className="custom-footer__items">
      {links.map((link) => (
        <li key={link.label} className="custom-footer__item">
          <a href={link.href} target="_blank" className="footer__link-item">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div className="custom-footer__col">
      <div className="footer__title">{title}</div>
      <FooterLinkList links={links} />
    </div>
  );
}

function FooterAccordion({ title, links }) {
  return (
    <details className="custom-footer__accordion">
      <summary className="custom-footer__accordion-summary">
        <span>{title}</span>
      </summary>
      <FooterLinkList links={links} />
    </details>
  );
}

export default function FooterWrapper() {
  const currentYear = new Date().getFullYear();
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  const logoSrc = isDark ? '/docusaurus/img/logo-green.svg' : '/docusaurus/img/logo-black.svg';
  const logoAlt = isDark ? 'Civo Logo (Dark)' : 'Civo Logo';

  return (
    <footer className="footer">
      <div className="container container-fluid">
        {/* Header: Logo + Social Icons */}
        <div className="custom-footer__header">
          <a href="https://www.civo.com/" target="_blank">
            <div className="navbar__logo">
              <img src={logoSrc} alt={logoAlt} />
            </div>
          </a>
          <div className="custom-footer__social">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" aria-label={social.label}>
                <div className="footer-circle">
                  {socialIcons[social.label]}
                </div>
              </a>
            ))}
          </div>
        </div>
        <hr className="footer-hr-color" />

        {/* Desktop: Grid link columns */}
        <div className="custom-footer__desktop">
          {footerColumns.map((col) => (
            <FooterColumn key={col.title} {...col} />
          ))}
        </div>

        {/* Mobile: Accordion sections */}
        <div className="custom-footer__mobile">
          {footerColumns.map((col) => (
            <FooterAccordion key={col.title} {...col} />
          ))}
        </div>

        {/* Desktop copyright */}
        <div className="custom-footer__copyright">
          {`Copyright \u00A9 ${currentYear}`}
          {legalLinks.map((link) => (
            <React.Fragment key={link.label}>
              {' | '}
              <a href={link.href} target="_blank" className="copyright-link">{link.label}</a>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile bottom section */}
        <div className="custom-footer__mobile-bottom">
          <div className="custom-footer__mobile-legal">
            <div className="custom-footer__mobile-bottom-title">Legal</div>
            <span>{`Copyright \u00A9 ${currentYear}`}</span>
            {legalLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" className="footer__link-item">
                {link.label}
              </a>
            ))}
          </div>
          <div className="custom-footer__mobile-social">
            <div className="custom-footer__mobile-bottom-title">Social</div>
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} target="_blank" className="footer__link-item">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
