import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import DefaultLayout from '../components/layout'

import "katex/dist/katex.min.css"

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <DefaultLayout>
        <div className="clearfix post-content-box">
          <article className="article-page">
            <div className="page-content">
              <div className="wrap-content">
                <header className="header-page">
                  <h1 className="page-title">{post.frontmatter.title}</h1>
                  <div className="page-date">
                    <span>{new Date(post.frontmatter.date).toLocaleString()}</span>
                  </div>
                </header>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <div className="page-footer">
                  <div className="page-back">
                    <Link className="tag" to={`/`}>Go back</Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </DefaultLayout>
    )
  }
}

export default BlogPost

export const pageQuery = graphql`
query BlogPostBySlug($slug: String!) {
  markdownRemark(fields: { slug: { eq: $slug } }) {
    id
    excerpt(pruneLength: 160)
    html
    frontmatter {
      title
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
  }
}
`