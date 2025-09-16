import React from 'react';
import Footer from '@theme-original/Footer';

export default function FooterWrapper(props) {
  return (
    <>
      <section class="theme-layout-footer-header footer">
        <div class="container container-fluid">
          <div class="theme-layout-footer-container">
            <a href="https://www.civo.com/" target="_blank" class=""><div class="navbar__logo"><img src="/docusaurus/img/logo-black.svg" alt="Civo Logo" class="themedComponent_mlkZ themedComponent--light_NVdE" /></div></a>
            <div class="theme-layout-footer-social">
              <a href="https://www.instagram.com/civocloud/" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/Instagram.svg" alt="Instagram" class="" /></div></a>
              <a href="https://www.facebook.com/civocloud/" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/Facebook.svg" alt="Civo Logo" class="" /></div></a>
              <a href="https://x.com/civocloud" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/x-com.svg" alt="Civo Logo" class="" /></div></a>
              <a href="https://www.linkedin.com/company/civocloud" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/LinkedIn.svg" alt="LinkedIn" class="" /></div></a>
              <a href="http://www.youtube.com/channel/UCZD2ggK3cnVD_sLMR6gUx2w?sub_confirmation=1&feature=subscribe-embed-click" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/YouTube.svg" alt="Civo Logo" class="" /></div></a>
              <a href="https://github.com/civo" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/github.svg" alt="Civo Logo" class="" /></div></a>
              <a href="https://bsky.app/profile/civo.com" target="_blank" class=""><div class="footer-circle"><img src="/docusaurus/img/bluesky.svg" alt="Civo Logo" class="" /></div></a>
            </div>
          </div>
          <hr class="footer-hr-color" />
        </div>
      </section>
      <Footer {...props} />
    </>
  );
}
