import React, { useState } from 'react';
import { render } from 'react-dom';
import Dog from './../components/Dog';
import Search from './../components/Search';

export default function Dogs() {
    const [dogImages, setDogImages] = useState<any>(undefined);

    const getDogPics = async (breed: string) => {
        setDogImages(null);
        const response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images/random/3`
        );
        const { message } = await response.json();
        setDogImages(message);
    };

    return (
        <div>
        <section>
            <Search getDogPics={getDogPics} />
        </section>
        <section>
            <Dog dogImages={dogImages} />
        </section>
    </div>
    );
  }
  