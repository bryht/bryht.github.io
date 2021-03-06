import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Sidebar from '.././components/sidebar'
import '../styles/main.scss'
import '../styles/fonts/font-awesome/css/font-awesome.min.css'

const DefaultLayout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
            description
            social {
              twitter
              facebook
              linkedin
              github
              email
            }
          }
        }
      }
    `}
    render={data => {
      if (!(data && data.site && data.site.siteMetadata)) {
        return "";
      }
      const { title } = data.site.siteMetadata;
      return (
        <div className="wrapper">
          <Helmet>
            <title>{title}</title>
            <link
              href="https://fonts.googleapis.com/css?family=Lato|PT+Serif&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          <Sidebar siteMetadata={data.site.siteMetadata} />
          {children}
        </div>
      )
    }}
  />
)

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DefaultLayout
