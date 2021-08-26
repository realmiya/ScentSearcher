import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
// import { Layout, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import CustomBackButton from './CustomBackButton';
import { Layout, message, PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Col, Divider } from 'antd';
import {Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const { Search } = Input;
const { SubMenu } = Menu;

const { Header } = Layout;

const StyledHeader = styled.div`
  background-color:#7dbcea;
`;


const UpperBox = styled.div`
  display:flex;
  padding-top: 20px;
`;

const UpperRow = styled(Row)`
  padding-top: 20px;
`;


const LogoutButton = styled(Button)`
  position: absolute;
  display: block;
  top: -1px;
  right: 0;
  width: 80px;
  height: 50px;
  margin: 7px 15px 7px 15px;
`;

const ReducePageHeader = styled(PageHeader)`
  padding-top: 0px;
`;


const LogoImg  = styled.img.attrs({
  src: '/image/logo.png'
})`
width: 160px;
height: 70px;
padding-left: 25px;
`;

const menu = (
  <Menu>
    <Link to ='/userprofile'>
      <Menu.Item key="MP">
        <a>My Profile</a>
      </Menu.Item>
    </Link>

    <Menu.Divider />
    <Link to ='/favPerfumepage'>
      <Menu.Item key="BP">
        <a>My Bookmark Perfumes</a>
      </Menu.Item>
    </Link>
  </Menu>
);



const onSearch = value => console.log(value);

function CustomHeader () {
  const logout = () => {localStorage.clear()};
//   const numbers = [1, 2, 3, 4, 5];
//   const listItems = numbers.map((number) =>
//   <li key={number.toString()}>
//     {number}
//   </li>
// );

  return (    
    <StyledHeader>
      <UpperRow>
        <Col span={8}>      
          <Link to ='/homepage'>
            <LogoImg></LogoImg>
          </Link>
        </Col>
        <Col span={8}></Col>
        <Col span={8}>
        {/* <Search placeholder="Search Perfumes By Name..." allowClear onSearch={onSearch}  /> */}
        </Col>
      </UpperRow>

      <ReducePageHeader
      className="site-page-header"
      // onBack={() => window.history.back()}
      title="Scent Searcher"
      // subTitle="This is a subtitle"
      extra={[
        <Link to ='/homepage'>
          <Tooltip title="search">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
        </Link>,
        // <Link to ='/userprofile'>
        //   <Button className="font-weight-bolder" icon={<SettingOutlined />} key="UC">User Center</Button>
        // </Link>,
        <Dropdown overlay={menu} trigger={['click']}>
          {/* <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            Click fddcme <DownOutlined />
          </a> */}
          <Button className="font-weight-bolder" icon={<SettingOutlined /> } 
          onClick={e => e.preventDefault()} key="UC">User Center <DownOutlined /></Button>
        </Dropdown>,
        <Button className="font-weight-bolder" icon={<MailOutlined />} key="M">Message</Button>,
        <Link to='/'>
          <Button className="font-weight-bolder" onClick={logout} key="Signout" icon={<PoweroffOutlined />}>Sign Out</Button>
        </Link>,
      ]}
      >
    </ReducePageHeader>
  </StyledHeader>
  )
}

export default CustomHeader;
