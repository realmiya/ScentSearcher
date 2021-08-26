import React from 'react';
import { Row, Col, Card, Avatar, Empty } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PerfumeCard from './components/PerfumeCard';
import Bookdiv from "../../../components/Bookmark";

function PerfumeList(props) {
  const perfumes = props.perfumeList;
  const renderPerfumes = perfumes.map((value, index) => (
    <PerfumeCard key={value + index} perfume={value} />
  ));
  console.log("perfumes",perfumes);
  return (
    <React.Fragment>
      <Col span={6}>
      <div className='image-container'>

        <Link to={`/perfumes/${perfumes[0].id}`}>
        
        <span className="tooltiptext">Click picture to see more details</span>
          <PerfumeCard key={perfumes[0].id} perfume={perfumes[0]} />
          
        </Link>

        <div className='overlay'>
          <Bookdiv 
              perfumeid={perfumes[0].id}
            />
        </div>
      </div>

      </Col>
      {
        perfumes.length >= 2 &&
        <Col span={6}>
        <div className='image-container'>
          <Link to={`/perfumes/${perfumes[1].id}`}>
          <span className="tooltiptext">Click picture to see more details</span>
            <PerfumeCard key={perfumes[1].id} perfume={perfumes[1]} />
          </Link>
          <div className='overlay'>
          <Bookdiv 
              perfumeid={perfumes[1].id}
            />
          </div>
        </div>

        </Col>
      }
      {
        perfumes.length >= 3 &&
        <Col span={6}>
        <div className='image-container'>
          <Link to={`/perfumes/${perfumes[2].id}`}>
          <span className="tooltiptext">Click picture to see more details</span>
            <PerfumeCard key={perfumes[2].id} perfume={perfumes[2]} />
          </Link>
          <div className='overlay'>
          <Bookdiv 
              perfumeid={perfumes[2].id}
            />
          </div>
        </div>

        </Col>
      }
      {
        perfumes.length >= 4 &&
        <Col span={6}>
        <div className='image-container'>
          <Link to={`/perfumes/${perfumes[3].id}`}>
          <span className="tooltiptext">Click picture to see more details</span>
            <PerfumeCard key={perfumes[3].id} perfume={perfumes[3]} />
          </Link>
          <div className='overlay'>
          <Bookdiv 
              perfumeid={perfumes[3].id}
            />
          </div>
        </div>
        </Col>
      }
    </React.Fragment>

  )
}

export default PerfumeList;
