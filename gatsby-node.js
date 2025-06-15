exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const currencyPairs = [
    "usd-to-inr-rate", "usd-to-krw-rate", "usd-to-jpy-rate", "usd-to-cad-rate",
    "usd-to-eur-rate", "usd-to-gbp-rate", "usd-to-cny-rate", "usd-to-mxn-rate",
    "gbp-to-inr-rate","eur-to-inr-rate",
  ];

  currencyPairs.forEach(pair => {
    createPage({
      path: `/currency-converter/${pair}`,
      component: require.resolve("./src/templates/CurrencyConverter.jsx"),
      context: { pairRate: pair },
    });
  });
};
