import React from 'react';

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="mx-auto text-center md:w-4/12 my-4 ">
            <p className="text-yellow-400">----{subheading}----</p>
            <h2 className="text-2xl uppercase border-y-4 py-3">{heading}</h2>
        </div>
    );
};

export default SectionTitle;