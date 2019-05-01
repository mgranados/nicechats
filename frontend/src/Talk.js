import React from 'react';

const Talk = ({match}) => {
  return (
    <React.Fragment>
      <h1>One Talk {`${match.params.id}`}</h1>
    </React.Fragment>
  );
};

export default Talk;
