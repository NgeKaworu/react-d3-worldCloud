import { connect } from "dva";
import React from "react";

@connect(state => ({
  about: state.about.about
}))
class About extends React.Component {
  render = () => {
    console.log(this.props);
    const { author, description } = this.props.about;
    return (
      <div>
        <h1>{author}</h1>
        <div>{description}</div>
      </div>
    );
  };
}
export default About;
