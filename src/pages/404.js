import React from 'react'
import DefaultLayout from '../components/layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <h1>That page doesn&#39;t exist.</h1>
        <br />
      </DefaultLayout>
    )
  }
}

export default NotFoundPage
