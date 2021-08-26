import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;

const FormItem = ({
  label,
  htmlFor,
  children,
}) => (
  <Item>
    <Label htmlFor={htmlFor}>{label}</Label>
    {children}
  </Item>
);

export default FormItem;
