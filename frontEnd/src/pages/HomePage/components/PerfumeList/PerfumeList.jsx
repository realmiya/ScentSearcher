import React from 'react';
import { Row, Col, Card, Avatar, Empty } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfumeCard from './components/PerfumeCard';

function PerfumeList(props) {
  const perfumes = props.perfumeList;
  const renderPerfumes = perfumes.map((value, index) => (
    <PerfumeCard key={value + index} perfume={value} />
  ));
  console.log("perfumes",perfumes);
  return (
    <React.Fragment>
      <Col span={6}>
        <Link to={`/perfumes/${perfumes[0].id}`}>
          <PerfumeCard key={perfumes[0].id} perfume={perfumes[0]} />
        </Link>

      </Col>
      {
        perfumes.length >= 2 &&
        <Col span={6}>
          <Link to={`/perfumes/${perfumes[1].id}`}>
            <PerfumeCard key={perfumes[1].id} perfume={perfumes[1]} />
          </Link>

        </Col>
      }
      {
        perfumes.length >= 3 &&
        <Col span={6}>
          <Link to={`/perfumes/${perfumes[2].id}`}>
            <PerfumeCard key={perfumes[2].id} perfume={perfumes[2]} />
          </Link>

        </Col>
      }
      {
        perfumes.length >= 4 &&
        <Col span={6}>
          <Link to={`/perfumes/${perfumes[3].id}`}>
            <PerfumeCard key={perfumes[3].id} perfume={perfumes[3]} />
          </Link>
        </Col>
      }
    </React.Fragment>

  )
}

export default PerfumeList;
