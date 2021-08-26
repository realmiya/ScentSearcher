import React from 'react';
import { Input, Space, Empty } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

function PerfumeSearchBar(props) {
  return (
    <Search
      placeholder="Search perfumes by name..."
      allowClear
      enterButton="Search"
      size="large"
      onSearch={props.onSearch}
    />
  )
}

export default PerfumeSearchBar;
