import React from 'react';

export default ({ dogImages }: { dogImages: string[] }) => {
  return (
    <div>
      {dogImages ? (
        dogImages.map((dog: string, index: number) => {
          return <img className="dog" src={dog} key={index} />;
        })
      ) : (
        <h1>Waiting...</h1>
      )}
    </div>
  );
};
