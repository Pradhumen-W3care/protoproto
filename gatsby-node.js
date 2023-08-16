const path = require(`path`);
const { paramCase } = require(`change-case`);

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Craft_home_home_Entry: {
      uri: {
        type: `String`,
        resolve: (object) => {
          return "";
        },
      },
    },
  });
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  const webpackConfig = {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@templates": path.resolve(__dirname, "src/templates"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@utilities": path.resolve(__dirname, "src/utilities"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
      },
    },
  };

  if (stage.includes("develop")) {
    webpackConfig.devtool = "cheap-module-source-map";
  }

  actions.setWebpackConfig(webpackConfig);
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const {
    data: {
      allCraftEntryInterface: { nodes: entries },
      allCraftProductInterface: { nodes: products },
      allCraftCategoryInterface: { nodes: categories },
    },
  } = await graphql(`
    query {
      allCraftEntryInterface {
        nodes {
          uri
          slug
          typeHandle
        }
      }
      allCraftProductInterface {
        nodes {
          uri
          slug
          typeHandle: productTypeHandle
        }
      }
      allCraftCategoryInterface {
        nodes {
          ... on Craft_productCategories_Category {
            id
            title
            slug
            uri
            url
          }
        }
      }
    }
  `);

  const handleTemplate = (element) => {
    switch (element.typeHandle) {
      case "kiberaLayout":
        return "stories/kibera-layout";

      case "storiesIndex":
        return "stories";

      case "collaborations":
        return "shop/collaborations";

      default:
        return paramCase(element.typeHandle);
    }
  };

  entries.forEach((element) => {
    if (element.typeHandle) {
      const template = handleTemplate(element);

      createPage({
        path: element.uri || "/",
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: element.slug,
        },
      });
    }
  });

  products.forEach((element) => {
    if (element.typeHandle) {
      const template = handleTemplate(element);

      createPage({
        path: element.uri || "/",
        component: path.resolve(`./src/templates/${template}.js`),
        context: {
          slug: element.slug,
        },
      });
    }
  });

  categories.forEach((category) => {
    if (category.slug) {
      createPage({
        path: `/categories/${category.slug}`,
        component: path.resolve("./src/templates/categories.js"),
        context: {
          slug: category.slug,
        },
      });
    }
  });
};