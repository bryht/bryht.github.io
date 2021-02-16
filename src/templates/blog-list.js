import React from 'react'
import { Link, graphql } from 'gatsby'

import DefaultLayout from '../components/layout'
class BlogList extends React.Component {
  getBlogList() {
    const { data } = this.props
    let posts = [];
    const articlesFromLocal = data.allMarkdownRemark.edges;
    const articlesFromRss = data.allFeedRss.edges;
    articlesFromLocal.forEach(({ node }) => {
      posts.push({
        id: node.fields.slug,
        link: node.fields.slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        date: node.frontmatter.date,
        img: node.frontmatter.img && node.frontmatter.img.childImageSharp.fluid.src,
        type: node.internal.type
      })
    });
    articlesFromRss.forEach(({ node }) => {
      posts.push({
        id: node.id,
        link: node.link,
        title: node.title,
        description: node.content.encodedSnippet.substring(0, 100)+"...",
        date: node.pubDate,
        img: null,
        type: node.internal.type,
      })
    });
    return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }
  render() {
    const posts = this.getBlogList();
    return (
      <DefaultLayout>
        <div className="content-box clearfix">
          {posts.map(element => {
            return (
              <article className="post" key={element.id}>
                {element.img &&
                  (
                    <Link
                      target="_blank"
                      to={element.link}
                      className="post-thumbnail"
                      style={{
                        backgroundImage: `url(${element.img})`,
                      }}
                    />
                  )}
                <div className="post-content">
                  <h2 className="post-title">
                    <Link
                      target="_blank"
                      to={element.link}
                    >
                      {element.title}
                    </Link>
                  </h2>
                  <p>
                    <Link
                      target="_blank"
                      style={{
                        textDecoration: 'none',
                        color: '#000000',
                      }}
                      to={element.link}
                    >
                      {element.description}
                    </Link>
                  </p>
                  <span className="post-date">
                    {new Date(element.date).toLocaleString()}
                  </span>
                </div>
              </article>
            )
          })}
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogList

export const pageQuery = graphql`
{
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          img {
            childImageSharp {
              fluid(maxWidth: 3720) {
                aspectRatio
                base64
                sizes
                src
                srcSet
              }
            }
          }
        }
        internal {
          type
        }
      }
    }
  }
  allFeedRss {
    edges {
      node {
        id
        title
        pubDate
        link
        content {
          encodedSnippet
        }
        internal {
          type
        }
      }
    }
  }
}
`