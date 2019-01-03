import React from "react";
import { connect } from "dva";
import styles from "./index.css";

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <h1>这是React和D3实现的词云demo</h1>
      <p>
        请点击上方的导航条切换到详细页测试
      </p>
      <p>
        技术栈
        <a target="_blank" href="https://react.docschina.org/docs/hello-world.html">react</a>+
        <a target="_blank" href="https://ant.design/docs/react/introduce-cn">
          antd
        </a>
         + <a target="_blank" href="https://dvajs.com/guide/">dva</a> +
        <a target="_blank" href="https://umijs.org/zh/guide/">umi</a> +
        <a target="_blank" href="https://github.com/d3/d3/wikii">d3</a> +
        <a target="_blank" href="https://github.com/jasondavies/d3-cloud">d3词云插件</a>
      </p>
      <p>
        <a target="_blank" href="https://github.com/NgeKaworu/auto-depoly-test">仓库地址</a>
      </p>
      <p>谢谢浏览ˋ( ° ▽、° )</p>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
