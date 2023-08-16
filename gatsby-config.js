require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Proto Proto | Street inspired, fair, fashion jewellery`,
    description: `We think design's got a problem. Basically, the people, countries, cultures with the money tell those without it what to do. If we want equality and diverse expression, it's all wrong. So we're changing that. We're prototyping new expressions and prototyping fairer ways to design and make things. We're Proto Proto.`,
    author: ``,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 100,
          breakpoints: [640, 768, 1024, 1440, 1792],
        },
      },
    },
    {
      resolve: `gatsby-plugin-transition-link`,
      options: {
        injectPageProps: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // The plugin order matters
        postCssPlugins: [
          require("postcss-import"),
          require("stylelint")({
            rules: {
              "at-rule-no-unknown": [
                true,
                {
                  ignoreAtRules: [
                    "screen",
                    "define-mixin",
                    "mixin",
                    "function",
                  ],
                },
              ],
            },
          }),
          require("postcss-mixins"),
          require("tailwindcss")("./tailwind.config.js"),
          require("postcss-extend-rule"),
          require("postcss-preset-env"), // Defaults to Stage 2
          require("postcss-atroot"),
          require("postcss-property-lookup"),
          require("postcss-nested"),
          require("autoprefixer")(),
          require("postcss-reporter")({ clearReportedMessages: true }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "GA-TRACKING_ID", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        // pluginConfig: {
        // Puts tracking script in the head instead of the body
        // head: false,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // },
      },
    },
    `gatsby-source-craft`,
    `gatsby-plugin-image`,

    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {},
        allPageHeaders: ["X-Frame-Options: SAMEORIGIN", ],
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
        transformHeaders: (headers, path) => headers,
        generateMatchPathRewrites: true,
      },
    },
  ],
}
