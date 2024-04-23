import React from 'react';
import SectionTitle from "../../Components/SectionTitle.jsx";
import {useForm} from "react-hook-form";
import useAxiosSecure from "../../Components/hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const img_hosting_token=import.meta.env.VITE_IMAGE_TOKEN;

const AddItem = () => {

    const [axiosSecure] = useAxiosSecure()
    const {
        register,
        handleSubmit,
        reset,
    } = useForm()
    const img_hosting_url = `https://api.imgbb.com/1/upload?expiration=600&key=${img_hosting_token}`

    const onSubmit = data => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.image[0]);
        console.log(formData);
        console.log(img_hosting_url);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse);
                //TODO Handle successful upload
                if(imgResponse.success){
                    const imgURL = imgResponse.data.display_url;
                    const { name, price, category, recipe} = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image:imgURL };
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data);
                            if(data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Menu item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    }


    return (
        <div className="w-full px-12">
            <SectionTitle
                subheading="What's New"
                heading="Add An Item"
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-amber-100 p-10">
                <label className="form-control mt-4">
                    <div className="label">
                        <span className="label-text font-semibold">Recipe Name</span>
                    </div>
                    <input type="text" {...register("name", {required: true})} placeholder="recipe name" className="input input-bordered w-full"/>
                </label>
                <div className="flex my-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Category</span>
                        </div>
                        <select defaultValue="Select" {...register("category", {required: true})} className="select select-bordered">
                            <option disabled>Select</option>
                            <option>Pizza</option>
                            <option>Salad</option>
                            <option>Soup</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </label>
                    <label className="form-control w-full ml-4">
                        <div className="label">
                            <span className="label-text font-semibold">Price</span>
                        </div>
                        <input type="number" {...register("price", {required: true})} placeholder="$"
                               className="input input-bordered w-full"/>
                    </label>
                </div>

                <label className="form-control">
                    <div className="label">
                        <span className="label-text font-semibold">Recipe description</span>
                    </div>
                    <textarea {...register("recipe", {required: true})} className="textarea textarea-bordered h-24"
                              placeholder="description"></textarea>
                </label>
                <label className="form-control w-full my-4">
                    <div className="label">
                        <span className="label-text font-semibold">Image</span>
                    </div>
                    <input type="file" {...register('image', {required: true})}
                           className="file-input file-input-bordered w-full max-w-xs"/>
                </label>
                <input className="btn mb-16 btn-active" type="submit" value="Add an Item"/>
            </form>
        </div>
    );
};

export default AddItem;