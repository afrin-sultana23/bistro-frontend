import React from 'react';

const MenuItems = ({item}) => {

    const {name, image, price, recipe} = item;

    return (
        <div className="flex space-x-2">
            <img style={{borderRadius: "0 200px 200px 200px"}} className="w-[104px]" src={image} alt=""/>
            <div>
                <h3 className='text-lg font-medium'>{name}---------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-amber-400 ">${price}</p>
        </div>
    );
};

export default MenuItems;