import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout as LayoutComponent, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './Layout.css';

class Layout extends Component {
  getCurrentKey = () => {
    const { pathname } = this.props.location;
    console.log(pathname);
    switch (pathname) {
      case '/startups':
        return ['2'];
      case '/results':
        return ['3'];
      default:
        return ['1'];
    }
  };

  render() {
    const { Header, Content, Footer } = LayoutComponent;
    const { children } = this.props;
    return (
      <LayoutComponent className="layout">
        <Header>
          <div className="logo" />
          <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={this.getCurrentKey()}>
            <Menu.Item key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/startups">Startups</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/results">Resultados</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="content">
          <div className="content-children">{children}</div>
        </Content>
        <Footer className="footer">StartUp Fest ©2019 Created by Rafael Freitas</Footer>
      </LayoutComponent>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const WrappedLayout = withRouter(props => <Layout {...props} />);

export default WrappedLayout;
