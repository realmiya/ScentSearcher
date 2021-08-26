import React from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { LeftCircleFilled } from '@ant-design/icons';

const StyledLeftCircleFilled = styled(LeftCircleFilled)`
position: absolute;
display: block;
left: 0;
font-size: 40px;
color: white;
`

function CustomBackButton () {
  return (
    <StyledLeftCircleFilled onClick={() => window.history.back()}/>
  )
}

export default CustomBackButton;
