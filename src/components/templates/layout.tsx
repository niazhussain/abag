import React from 'react';
import { Header } from '../molecules/header';
import { Content } from '../atoms/content';

export const Layout = (props: {
  buttons: React.ReactElement | any;
  title: React.ReactNode;
  children: React.ReactNode;
}) => {
  const Buttons = props.buttons;

  return (
    <React.Fragment>
      <Header text={props.title}>
        <Buttons />
      </Header>
      <Content>{props.children}</Content>
    </React.Fragment>
  );
};
