import React from 'react';
import { Input, Space, Empty, Row, Col, Button } from 'antd';
import styled from 'styled-components';
import SearchSelect from './components/SearchSelect';
import getNotes from '../../../../utils/getNotes';

const { Search } = Input;

async function fetchNoteList(noteName) {
  console.log('fetching user', noteName);
  return getNotes(noteName)
    .then((response) =>
      response.map((note) => ({
        label: `${note.noteName}`,
        value: note.id,
      })),
    );
}

function NotesSearchBar(props) {
  const [includingValue, setIncludingValue] = React.useState([]);
  const [excludingValue, setExcludingValue] = React.useState([]);

  return (
    <React.Fragment>
      <Col span={10}>
        <SearchSelect
          mode="multiple"
          value={includingValue}
          placeholder="Including notes"
          fetchOptions={fetchNoteList}
          onChange={(newValue) => {
            setIncludingValue(newValue);
          }}
          style={{
            width: '100%',
          }}
        />
      </Col>
      <Col span={10}>
        <SearchSelect
          mode="multiple"
          value={excludingValue}
          placeholder="Excluding notes"
          fetchOptions={fetchNoteList}
          onChange={(newValue) => {
            setExcludingValue(newValue);
          }}
          style={{
            width: '100%',
          }}
        />
      </Col>
      <Row>
        <Col span={4}>
          <Button onClick={() => props.onSearch(includingValue, excludingValue)}>submit</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default NotesSearchBar;
