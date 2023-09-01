import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import {Inertia} from '@inertiajs/inertia'
import axios from "axios";


function EditModal(props) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [img, setImg] = useState(null);
    const [stok, setStok] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [nameError, setNameError] = useState('');


    const updateProduct = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('name', name);
        formData.append('desc', desc);
        formData.append('price', price);
        formData.append('stok', stok);
        if (img) {
          formData.append('img', img);
        }
      
        axios
          .post(`/products/${props.productId.id}`, formData)
          .then((response) => {
            setName('');
            setDesc('');
            setPrice('');
            setStok('');
            setImg(null);
            setIsLoading(false);
            props.onClose();
          })
          .catch((error) => {
            console.log(error); // Handle the error
          });
      };
    
      
  
    // const updateProduct = (e) => {
    //     e.preventDefault()
    //     // const data = {
    //     //     name, desc, price ,img
    //     // }
    //     Inertia.post(`/products/${props.productId.id}`, {
    //         _method: 'put',
    //         name: name,
    //         desc: desc,
    //         price: price,
    //         img: img
    //     }
    //     )
    //     setName('');
    //     setDesc('');
    //     setPrice('');
    //     props.onClose();
    //   };
    
    useEffect(()=>{
        if (props.productId) {
            setName(props.productId.name || '');
            setDesc(props.productId.desc || '');
            setPrice(props.productId.price || '');
            setStok(props.productId.stok || '');
            setImg(props.productId.img || null);
          }
    },[props.productId])

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
          setImg(selectedFile);
          const imageUrl = URL.createObjectURL(selectedFile);
          setPreviewUrl(imageUrl);
        } else {
          setImg(null); 
          setPreviewUrl(getImageUrl(props.productId.img)); 
        }
      };
      const getImageUrl = (image) => {
        if (image) {
          return image.startsWith('http') ? image : `/storage/${image}`;
        } else {
          return '/images/fallback-image.jpg'; 
        }
      };
      
    //   console.log(props)
    return (
        <>
            <AnimatePresence>
                {props.editModal ? (
                    <motion.div className="">
                        <motion.div
                            className="modall h-[100rem] modal-bg"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <motion.div className="modal-content">
                                <motion.span
                                    className="close-button" 
                                    onClick={props.onClose}
                                >
                                    &times;
                                </motion.span>

                                <form
                                    onSubmit={updateProduct}
                                    encType="multipart/form-data"
                                >
                                    {nameError && (
                                        <div className="error-message">
                                            {nameError}
                                        </div>
                                    )}
                                    <label htmlFor="name">Name</label>
                                    <input
                                        placeholder="Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        // value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />

                                    <label htmlFor="desc">Description</label>
                                    <input
                                        placeholder="Description"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        type="text"
                                        id="desc"
                                        name="desc"
                                        value={desc}
                                        onChange={(e) =>
                                            setDesc(e.target.value)
                                        }
                                    />

                                    <label htmlFor="price">Price</label>
                                    <input
                                        placeholder="1x.xxx"
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    />

                                    <label htmlFor="stok">Stok</label>
                                    <input
                                        placeholder="stok"
                                        type="text"
                                        id="stok"
                                        name="stok"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        value={stok}
                                        onChange={(e) =>
                                            setStok(e.target.value)
                                        }
                                    />

                                    <label htmlFor="img">Image</label>
                                    <input
                                        className="block"
                                        type="file"
                                        name="img"
                                        onChange={handleImageChange}
                                        accept="image/png, image/jpeg"
                                    />
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            className="h-36"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="div">
                                            <img
                                                src={getImageUrl(
                                                    props.productId.img
                                                )}
                                                className="h-36"
                                                alt="preview"
                                            />
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="border mt-5 mb-5 block border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                                    >
                                        {isLoading ? (
                                            <div>
                                                <svg
                                                    className="animate-spin bg-white rounded-sm h-5 w-5 mr-3 ..."
                                                    viewBox="0 0 24 24"
                                                ></svg>
                                            </div>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </form>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                ) : (
                    ""
                )}
            </AnimatePresence>
        </>
    );
}

export default EditModal;
