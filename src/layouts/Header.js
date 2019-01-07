import { Menu, Icon } from "antd";
import Link from "umi/link";

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
      <Menu.Item key="/about">
        <Link to="/about">
          <Icon type="bars" />
          About
        </Link>
      </Menu.Item>
      <Menu.Item key="/job">
        <Link to="/job">
          <Icon type="bars" />
          Job spiders
        </Link>
      </Menu.Item>
      <Menu.Item key="vueDemos">
        <a href="http://furan.xyz/vue">
          <Icon type="slack" />
          Vue demos
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
