import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:2;
`;
//wrapper是灰色的，意思是，点了灰色部分modal也会关闭。

const Container = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 500px;
  padding: 50px;
  position: relative;
`;

const Modal = ({
  children,
  onClose,
}) => (
  // <Wrapper onClick={onClose}>
  <Wrapper>  
    <Container onClick={(event) => event.stopPropagation()}>
      {children}
    </Container>
  </Wrapper>
);

export default Modal;
