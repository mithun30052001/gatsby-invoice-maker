require("dotenv").config();
const https = require("https");
https.globalAgent.options.rejectUnauthorized = false

module.exports = {
  siteMetadata: {
    title: "Invoice Maker",
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "https://invoice-strapi.onrender.com/",
        collectionTypes: ["test-one", "test-two"],
        accessToken: process.env.STRAPI_API_TOKEN,
        singleTypes: ["test-one", "test-two"],
        downloadFile: true,
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				})
      },
    },
  ],
};
