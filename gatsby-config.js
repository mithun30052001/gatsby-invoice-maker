require("dotenv").config();
const https = require("https");
https.globalAgent.options.rejectUnauthorized = false

module.exports = {
  siteMetadata: {
    title: "Gatsby Invoice Maker",
    description: "A gatsby site for creating invoices and currency conversion",
    author: "Mithun L",
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337/",
        collectionTypes: ["test-one", "test-two"],
        accessToken: process.env.STRAPI_API_TOKEN,
        singleTypes: ["test-one", "test-two"],
        downloadFile: true,
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				})
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-image`,
		`gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    
  ],
};
