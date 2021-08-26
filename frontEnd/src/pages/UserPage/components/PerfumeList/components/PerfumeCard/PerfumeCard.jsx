import React from 'react';
import { Card, Avatar } from 'antd';
import styled from 'styled-components';

const { Meta } = Card;
const styledMeta = styled(Meta)`
  overflow: hidden,
`
function PerfumeCard(props) {
  const perfume = props.perfume;
  let perfumeNameString = "test";
  if (perfume.perfumeName) {
    if (perfume.perfumeName.length > 25) {
      perfumeNameString = perfume.perfumeName.slice(0, 22) + "...";
    } else {
      perfumeNameString = perfume.perfumeName;
    }
    
  }

  return (
    <>
      <div >
        <Card
          style={{ width: '100%', marginTop: 12, marginBottom: 12 }}
          cover={<img alt='Cover' src={perfume.image} width={250} height={250}/>}
        >
          <Meta
            title={perfume? perfume.brand : "test"}
            description={perfumeNameString}
          />
        </Card>
      </div>
    </>
  )
}

export default PerfumeCard;
