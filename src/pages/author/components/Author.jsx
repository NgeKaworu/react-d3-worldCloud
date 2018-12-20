import { connect } from "dva";
import React from "react";
import WordCloud from "../../../components/WordCloud";
import router from 'umi/router';
import immutable from 'immutable';

@connect(state => ({
  author: state.author.list
}))
class Author extends React.Component {

  handlerCallback = cb => {
    const value = cb.target.firstChild.nodeValue;
    router.push({pathname: `/about`, query: {author: value} })
  }

  render = () => {
    const { author } = this.props;
    const data = author.map(d => ({ text: d.author, size: d.count }));
    const immuData = immutable.fromJS(data)
    return <WordCloud immuData={immuData} cb={this.handlerCallback}/>;
  }
}

export default Author;
