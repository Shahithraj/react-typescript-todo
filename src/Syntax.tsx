import React from 'react';

const Syntax = () => {
  let name: string = 'abcd';
  let age: number | string = '20';
  let array: string[];
  let tuple: [number, boolean] = [5, true];

  // declaring object
  type Person = {
    firstName: string;
    age?: number; // age is optional
  };

  interface People {
    country: string;
    state: string;
  }

  interface Guy extends People {
    name: string;
  }

  let X: Guy = {
    name: 'abcd',
    country: 'India',
    state: 'TN',
  };

  let person: Person = {
    firstName: 'string',
  };

  // array of object
  let lotsOfPerson: Person[] = [
    {
      firstName: 'string',
      age: 10,
    },
    {
      firstName: 'string',
      age: 10,
    },
  ];
  return <div>Syntax</div>;
};

export default Syntax;
