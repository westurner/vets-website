const Timeouts = require('../util/timeouts.js');
const SitemapHelpers = require('../util/sitemap-helpers');

module.exports = {
  'second half': (client) => {
    SitemapHelpers.sitemapURLs(urls => {
      const half = Math.ceil(urls.length / 2);
      const side = urls.splice(half);

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
