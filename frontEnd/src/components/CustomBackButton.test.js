import React from 'react';
import { shallow } from 'enzyme';
import styled from 'styled-components';
// import renderer from 'react-test-renderer';
// import styled from 'styled-components';
import 'antd/dist/antd.css';
import CustomBackButton from './CustomBackButton';
import { LeftCircleFilled } from '@ant-design/icons';

const StyledLeftCircleFilled = styled(LeftCircleFilled)`
position: absolute;
display: block;
left: 0;
font-size: 40px;
color: white;
`

describe('CustomBackButton', () => {
  // const noop = () => {};

  it('contains all child nodes', () => {
    const wrapper = shallow(<CustomBackButton />);
    expect(wrapper.find('span.some-class')).toHaveLength(0);
  })

  it('triggers back when clicked', () => {
    const onClick = jest.fn();
    shallow(<StyledLeftCircleFilled onClick={onClick}/>).simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1);
  })
})
