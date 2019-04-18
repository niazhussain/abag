import React from 'react';
import { Translation } from './translation';
import { ILinkButton, LinkButton } from '../components/atoms/link-button';

export const Buttons = (): React.ReactNodeArray =>
  [
    {
      link: '/',
      children: <Translation translateKey="convertor.title" />,
    },
    {
      link: '/rates',
      children: <Translation translateKey="rates.title" />,
    },
  ].map((button: ILinkButton, index: number) => (
    <LinkButton key={index} {...button} />
  ));
