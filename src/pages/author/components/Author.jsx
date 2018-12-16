import { connect } from "dva";
import React from "react";
import WordCloud from "../../../components/WordCloud";
import withRouter from 'umi/withRouter';
import immutable from 'immutable';

@withRouter
@connect(state => ({
  author: state.author.list
}))
class Author extends React.Component {

  render() {
    // console.log(this.props);
    const { author } = this.props;
    const data = author.map(d => ({ text: d.author, size: d.count }));
    const immuData = immutable.fromJS(data)
    return <WordCloud immuData={immuData} />;
  }
}

export default Author;
