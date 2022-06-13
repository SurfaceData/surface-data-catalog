import { Submit } from '@redwoodjs/forms'
import styled, { css } from 'styled-components';

const SurfaceSubmit = styled(Submit)<{
  outline?: boolean,
  rounded?: boolean,
}>`;
  position: relative;
  box-sizing: border-box;
  padding: .5rem 1rem;
  min-width: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .9rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: #a6a6a6;
  outline: none;
  background: #4a4a4a;
  color: #fff;

  ${props => props.outline && css`
    border-radius: 4px;
    background-color: #fff;
    color: #000;
  `}

  ${props => props.rounded && css`
    border-radius: 50px;
  `}

  :hover {
    background-color: #fff;
    border-color: #4a4a4a;
    color: #000;
    text-decoration: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default SurfaceSubmit
