import React from 'react';
import { Button } from '@material-ui/core';
import Link from 'next/link';

export interface ILinkButton {
  children: React.ReactNode;
  link: string;
}

export const LinkButton = (props: ILinkButton) => {
  return (
    <Link href={props.link}>
      <Button color="inherit">{props.children}</Button>
    </Link>
  );
};
