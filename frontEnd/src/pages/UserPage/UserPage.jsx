import React, { useState, useEffect, createElement } from 'react';
import { Descriptions, Badge, Card, Row, Col, Comment, Tooltip, Avatar, List, Typography, Divider, Rate, Form, Modal, Button, Radio, Input, Empty } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import styled from 'styled-components';
import getAccountWithBookmarks from '../../utils/getAccountWithBookmarks';
import PerfumeList from './components/PerfumeList';
import getAccountId from '../../utils/getAccountId';

function UserPage(props) {
  const username = props.match.params.Username;
  const [user, setUser] = React.useState({});
  const [perfumes, setPerfumes] = useState([]);
  const [perfumesGroups, setPerfumesGroups] = useState([]);
  const [numberToShow, setNumberToShow] = useState(20);
  const [currentUserId, setCurrentUserId] = useState(0);
  let jwtToken = localStorage.getItem("JWT_TOKEN");

  useEffect(() => {
    getAccountWithBookmarks(username, jwtToken).then(res => {
      setUser(res);
      setPerfumes(res.perfumes);
      const result = [];
      for (let i = 0; i < Math.min(20, res.perfumes.length); i += 4) {
        result.push(res.perfumes.slice(i, i + 4));
      }
      setPerfumesGroups(result);
      getAccountId(username, jwtToken).then(res => {
        setCurrentUserId(res.id);
      })
    })
  }, [])

  const renderPerfumes = perfumesGroups.map((value, index) =>
  (
    <Row key={`${index} ${value}`} justify='center' gutter={[24, 24]}>
      <PerfumeList
        key={`${value}`}
        perfumeList={value}
        currentId = {currentUserId}
      >
      </PerfumeList>

    </Row>
  )
  );


  function showMore() {
    let currentNumberToShow = numberToShow;  //number to show is 20
    // console.log(perfumes.length);
    setNumberToShow(currentNumberToShow + 20);
    let result = [];
    for (let i = 0; i < Math.min(currentNumberToShow + 20, perfumes.length); i += 4) {
      result.push(perfumes.slice(i, i + 4));
    }
    setPerfumesGroups(result);
  }


  return (
    <React.Fragment>
      <Descriptions title="User Info" bordered column={1} size="small" labelStyle={{ fontSize: 16 }} contentStyle={{ fontSize: 16 }}>
        <Descriptions.Item label="UserName">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Name">{`${user.firstName} ${user.lastName}`}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
      </Descriptions>
      <Divider orientation="center">Bookmarked Perfumes</Divider>
      {perfumes.length === 0 &&
        <Row justify='center'>
          <Col span={12}>
            <Empty></Empty>
          </Col>
        </Row>
      }

      {renderPerfumes}

      {perfumes.length > numberToShow &&
        <Row justify='center'>
          <Col>
            <Button size='large' onClick={showMore}>More</Button>
          </Col>
        </Row>
      }
    </React.Fragment>

  )
}

export default UserPage;
