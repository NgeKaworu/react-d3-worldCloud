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

  handlerCallback = cb => {
    const value = cb.firstChild.nodeValue;
    this.props.history.push(`/about/${value}`)
  }

  render = () => {
    const { author } = this.props;
    const data = author.map(d => ({ text: d.author, size: d.count }));
    const immuData = immutable.fromJS(data)
    return <WordCloud immuData={immuData} cb={this.handlerCallback}/>;
  }
}

export default Author;
