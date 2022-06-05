import { Layout } from 'antd';
import styled from 'styled-components';

const { Content: ContentComponent } = Layout;

export const Container = styled(Layout)`
  display: flex;
  height: 100vh;
  align-content: center;
  justify-content: center;
`;

export const Content = styled(ContentComponent)`
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
`;
