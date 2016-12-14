// nightwatch is capable of running tests in parallel, but only if the
// test definitions are in separate files. This runs accessibility tests
// over the first half of urls in the sitemap, while `sitemap_2.spec.js`
// runs over the second half. Crude, but this enables nightwatch to
// parallelize these.

const Timeouts = require('../util/timeouts.js');
const SitemapHelpers = require('../util/sitemap-helpers');

module.exports = {
  'first half': (client) => {
    SitemapHelpers.sitemapURLs(urls => {
      const half = Math.ceil(urls.length / 2);
      const side = urls.splice(0, half);

      side.forEach(url => {
        client
          .url(url)
          .waitForElementVisible('body', Timeouts.normal)
          .axeCheck('document', { scope: url });
      });

      client.end();
    });
  }
};
