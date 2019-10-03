import { Menu, Icon } from "antd";
import Link from "umi/link";
import router from "umi/router";

function Header({ location }) {
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal" theme="dark">
      <Menu.Item key="/">
        <Link to="/">
          <Icon type="home" />
          Home
        </Link>
      </Menu.Item>
      <Menu.Item key="/author">
        <Link to="/author">
          <Icon type="bars" />
          Author
        </Link>
      </Menu.Item>
      <Menu.Item key="/author/about">
        <Link to="/author/about">
          <Icon type="bars" />
          About
        </Link>
      </Menu.Item>
      <Menu.SubMenu
        key="/job/new/"
        onTitleClick={() => router.push('/job/new/')}
        title={
          <span>
            <Icon type="appstore" />
            <span>Job Word Clound</span>
          </span>
        }>
        <Menu.Item key="/job/">
          <Link to="/job/">
            <Icon type="bars" />
            Old Job spiders
        </Link>
        </Menu.Item>
        <Menu.Item key="/job/new/">
          <Link to="/job/new/">
            <Icon type="bars" />
            New Job spiders
        </Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="vueDemos">
        <a href="https://furan.xyz/vue">
          <Icon type="export" />
          Vue demos
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
