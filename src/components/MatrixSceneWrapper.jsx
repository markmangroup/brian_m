import React from 'react';
import MatrixRouteBanner from './MatrixRouteBanner';

export default function MatrixSceneWrapper({ children, title, subtitle, status }) {
  return (
    <>
      <MatrixRouteBanner title={title} subtitle={subtitle} status={status} />
      <div className="mt-10 flex flex-col items-center justify-center min-h-[60vh]">
        {children}
      </div>
    </>
  );
}
