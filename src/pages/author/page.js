import { connect } from "dva";
import React from "react";
import WordCloud from '../../components/WordCloud'

@connect(state => ({
  author: state.author.list
}))
class Author extends React.Component {
  render() {
    const { author } = this.props
    const data = author.map(d => ({ text: d.author, size: d.count }))
    return <WordCloud data={data}/>
  }
}

export default Author;
