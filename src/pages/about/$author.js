import React from 'react'
import withRouter from 'umi/withRouter';

@withRouter
class About extends React.Component {
  render = () => {
    console.log(this.props);
    const author = this.props.match.params.author
    return <div>{author}</div>
  }
}
export default About
