import React, { useState, useEffect, createElement } from 'react';
import { Descriptions, Badge, Card, Row, Col, Comment, Tooltip, Avatar, List, Typography, Divider, Rate, Form, Modal, Button, Radio, Input } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import getPerfumesById from '../../utils/getPerfumesById';
import tempLogo from './assets/img/logo512.png';
import Bookdiv from '../../components/Bookmark';
import postReview from '../../utils/postReview';

function PerfumeDetailPage(props) {
  const perfumeId = props.match.params.PerfumeId;
  const currentUsername = localStorage.getItem("username");
  const [perfume, setPerfume] = React.useState({});
  const [noteNameList, setNoteNameList] = React.useState([]);
  const [reviewList, setReviewList] = React.useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    let submitReview = { ...values };
    submitReview["accountId"] = localStorage.getItem("userId");
    submitReview["perfumeId"] = perfumeId;
    postReview(submitReview).then(res => console.log("res", res));
    window.location.reload();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    getPerfumesById(perfumeId).then(res => {
      console.log(res);
      let tempList = [];
      setPerfume(res);
      for (let i = 0; i < res.notes.length; i++) {
        tempList.push(res.notes[i].noteName);
      }
      setNoteNameList(tempList);
      setReviewList(res.reviews);
    })

  }, [])

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


  const renderNotes = (perfume.notes && perfume.notes.map((value, index) =>
  (
    <Descriptions.Item key={`${index}`}>
      {value.noteName}
    </Descriptions.Item>
  )
  ));


  return (
    <React.Fragment>
      <Row justify='center'>
        <Col>

          <Descriptions title={`${perfume.perfumeName}`} bordered column={1} size="small" labelStyle={{ fontSize: 16 }} contentStyle={{ fontSize: 16 }}>

            <Descriptions.Item>
              <Row justify='center'>
                <img
                  alt={perfume.perfumeName}
                  src={perfume.image}
                  width={250}
                  height={250}
                />
              </Row>

            </Descriptions.Item>



            <div className='bookmark-container font-weight-bold' style={{ padding: "20px 35px 20px 45px" }}>
              <Descriptions.Item>
                <Row justify='center'>
                <Bookdiv
                  perfumeid={perfumeId}
                />
                </Row>

              </Descriptions.Item>
            </div>

            {/* </div> */}




            <Descriptions.Item label="Brand">
              {`${perfume.brand}`}
            </Descriptions.Item>
            <Descriptions.Item label="Production Year">
              {`${perfume.date}`}
            </Descriptions.Item>
            <Descriptions.Item label="Target User">
              {`${perfume.target}`}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {perfume.description}
            </Descriptions.Item>
            {/* {renderNotes} */}
            <Descriptions.Item label="Notes">
              <List
                bordered
                dataSource={noteNameList}
                renderItem={item => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <Row justify="center">
        <Col>
          <List
            className="comment-list"
            header={`${reviewList.length} reviews`}
            itemLayout="horizontal"
            dataSource={reviewList}
            renderItem={item => (
              <li>
                {currentUsername === item.account.username ? (
                  <div>
                    {item.account.username}
                  </div>
                ) : (
                  <Link to={`/users/${item.account.username}`}>
                    {item.account.username}
                  </Link>
                )}
                <Comment
                  actions={
                    [
                      <Tooltip key="comment-basic-like" title="Like">
                        <span>
                          {createElement(item.ifLike ? LikeFilled : LikeOutlined)}
                        </span>
                      </Tooltip>,
                      <Tooltip key="comment-basic-dislike" title="Dislike">
                        <span>
                          {React.createElement(!item.ifLike ? DislikeFilled : DislikeOutlined)}
                        </span>
                      </Tooltip>,
                      <Rate tooltips={desc} disabled defaultValue={item.rating}></Rate>
                    ]
                  }
                  content={item.review}
                />

              </li>
            )}
          />
          <Button type="primary" onClick={showModal}>
            Add review
          </Button>
          <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
            <Form {...layout} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
              <Form.Item name="ifLike" label="Like or not" rules={[{ required: true }]}>
                <Radio.Group>
                  <Radio value="true">Like</Radio>
                  <Radio value="false">Dislike</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
                <Rate tooltips={desc} />
              </Form.Item>
              <Form.Item name="review" label="review" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={handleCancel}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Col>
      </Row>
    </React.Fragment>

  )
}

export default PerfumeDetailPage;
