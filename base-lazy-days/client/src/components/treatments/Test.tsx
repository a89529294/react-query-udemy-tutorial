import React from 'react';
import { useQuery } from 'react-query';

function Test() {
  const a = useQuery(
    ['abc'],
    (): Promise<number[]> =>
      new Promise((r) => setTimeout(() => r([1, 2, 3]), 2000)),
  );
  return <div>{a.data.map((k) => k)}</div>;
}

export default Test;
