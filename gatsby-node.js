const path = require(`path`)
const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data } = await graphql(
    `{
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }  
    `
  );

  // Create blog post list pages
  createPage({
    path: `/`,
    component: path.resolve("./src/templates/blog-list.js"),
  });

  // Create blog posts pages.
  const posts = data.allMarkdownRemark.edges
  posts.forEach((post, index) => {
    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
      },
    })
  });

  
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}