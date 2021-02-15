module.exports = {
  siteMetadata: {
    title: `Ming`,
    description: `I am a developer, welcome to talk with me.`,
    author: `Ming`,
    siteUrl: `https://github.com/bryht`,
    social: {
      twitter: ``,
      facebook: ``,
      github: `bryht`,
      linkedin: `bryht`,
      email: `bryht@live.com`,
    },
  },
  pathPrefix: "/bryht.github.io",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 970,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `warn`,
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `files`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://medium.com/feed/@bryht`,
        name: `Rss`,
        // Read parser document: https://github.com/bobby-brennan/rss-parser#readme
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
  ],
}
