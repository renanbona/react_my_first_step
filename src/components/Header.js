import { render } from '@testing-library/react';
import React, { Children } from 'react';

export default function Header({ title }) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
}