import React, { useState, useEffect } from 'react';

export default ({ getDogPics }: { getDogPics: (arg0: string) => void }) => {
    const [breedList, setBreedList] = useState<string[]>([]);

    useEffect(() => {
        getBreedList();
    }, []);

    async function getBreedList() {
        const data = await fetch('https://dog.ceo/api/breeds/list/all');
        const { message } = await data.json();
        setBreedList(Object.keys(message));
    }

    return (
        <div>
            <label htmlFor="breedList">Choose a breed to see pics!</label>
            <select name="breedList" onChange={(e) => getDogPics(e.target.value)}>
                <option value="">Select a breed</option>
                {breedList.map((breed) => {
                    return (
                        <option value={breed} key={breed}>
                            {breed}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
