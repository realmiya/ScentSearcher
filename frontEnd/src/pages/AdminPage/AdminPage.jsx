import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import getNotes from '../../utils/getNotes';
import fileToDataUrl from '../../utils/fileToDataUrl';
import React, { useState } from "react";
import ReactFileReader from 'react-file-reader';
import SearchSelect from '../usercenter/component';
import getAllNotes from '../../utils/getAllNotes';

import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  message
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';


const AdminPage = () => {
    const axios = require('axios');
    const { Option } = Select;
    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 14,
      },
    };
    

    const Section = styled.section`
        display: flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
    `;

    const [MergedObj, setMergedObj] = useState({});
    const [allNotes, setallNotes] = useState([]);

    const handleFiles = (files) => {
        const objBase64 = {
            image: null,
        };
        const Data64=files.base64.toString();
        console.log(Data64);
        objBase64.image =Data64;
        setMergedObj(objBase64);
        console.log("64", MergedObj)
        }

    const onFinish = (values) => {
        allnote();
        const final={...values, ...MergedObj }
        const noteListAdmin=[];
        includingValue.map((note)=>{
            noteListAdmin.push(note.value)
          })
        console.log("noteListAdmin",noteListAdmin);
        const objAdminNote = {
            notes: null,
        };
        objAdminNote.notes= noteListAdmin;
        const finalfinal={...values, ...MergedObj, ...objAdminNote }
        const body = JSON.stringify(finalfinal)
        console.log("finalbody",finalfinal.perfumeName);

        const api = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        }
        axios.post(`http://Comp9900fightbackend2-env-1.eba-hmyvi3ug.ap-southeast-2.elasticbeanstalk.com/addPerfumeDetails`, body, {headers: api}).then((res)=>{
            if(res.status==200){
                message.info(`Add perfume ${finalfinal.perfumeName} successfully!`);
            }
            
        }).catch(err => console.log(err));
    };

    async function fetchNoteList(noteName){
        console.log('fetching user', noteName);
        return getNotes(noteName)
        .then((response) =>{
            return response.map((note) => (
            {
                label: note.noteName,
                value: note.id
            })
            )
        },);
    }


    const allnote=()=>{
        getAllNotes().then(res=>{
            setallNotes(res)
        })
    }




  const [includingValue, setIncludingValue] = React.useState([]);

  return (
    <>
      <div className="font-weight-bold mx-auto" >
        <h2 style={{margin:"0 0 50px 0"}}>Hi, Admin :) ~Edit A Perfume~</h2>

        <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
        }}
        >
            <Row>
            <Col span={6}></Col>
            <Col span={4}></Col>
            <Col span={6}>
            <Form.Item>
                <ReactFileReader fileTypes={[".png",".jpeg",".jpg"]} base64={true} multipleFiles={true} handleFiles={handleFiles}>
                    <button className='btn btn-primary '>Upload Perfume's Image</button>
                </ReactFileReader>
            </Form.Item>
            </Col>
            <Col span={6}></Col>
            </Row>
            <Form.Item 
                label="Perfume Name"
                name="perfumeName"
                rules={[
                {
                    required: true,
                    message: 'Please input the Perfume Name',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Perfume Brand"
                name="brand"
                rules={[
                {
                    required: true,
                    message: "Please input the Perfume's Brand",
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item 
                label="Date of Release"
                name="date"
                type="number"
                rules={[
                {
                    required: true,
                    message: 'Please input the date of release',
                },
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item 
                label="Target Audience"
                name="target"
                rules={[
                {
                    required: true,
                    message: "Please input the perfume's target",
                },
                ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item 
                name="description" 
                label="Description Of Perfume"
                rules={[
                {
                    required: true,
                    message: "Please input the perfume's description",
                },
                ]}>
            <Input.TextArea />
            </Form.Item>
                <p>Insert notes to the perfume:</p>
                    <SearchSelect
                    mode="multiple"
                    value={includingValue}
                    placeholder="insert notes to the perfume..."
                    fetchOptions={fetchNoteList}
                    onChange={
                        (newValue) => {
                        setIncludingValue(newValue);
                    }}
                    style={{
                        width: '100%',}}
                    />
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                        <Form.Item 
                        >
                            <Button type="primary" htmlType="submit" size="large" style={{margin:'30px'}}>
                            Submit Perfume's detail
                            </Button>
                        </Form.Item>
                        </Col>
                <Col span={8}></Col>
            </Row>
        </Form>
        </div>
    </>
  );
};
export default AdminPage;
