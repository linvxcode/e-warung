import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
// import {Inertia} from '@inertiajs/inertia'
import axios from "axios";


function AddModal(props) {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [stok, setStok] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const [img, setImg] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [errors, setErrors ] = useState('');

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        setImg(selectedFile); // Update the selected image file state
      
        if (selectedFile) {
          const imageUrl = URL.createObjectURL(selectedFile);
          setPreviewUrl(imageUrl); // Update the preview URL state
        }
      };
      
      const formattedPrice = price.replace(/\./g, '');
      const handlePriceChange = (e) => {
        const rawValue = e.target.value;
        
        // Remove non-numeric characters from the input value
        const numericValue = rawValue.replace(/\D/g, '');
        
        // Insert a dot after every three numeric characters
        const formattedValue = numericValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        
        setPrice(formattedValue);
      };

      const validateForm = () =>{
        const newError = {};
        let isValid = true;
        if(name.trim() === ''){
          newError.name = 'Name Can not Be Empty';
          isValid = false;
        }
        if(desc.trim() === ''){
          newError.desc = 'Desc Can not Be Empty';
          isValid = false;
        }
        if(price.trim() === ''){
          newError.price = 'Price Can not Be Empty';
          isValid = false;
        }
        if(stok.trim() === ''){
          newError.stok = 'Stok Can not Be Empty';
          isValid = false;
        }
        // if(img.trim() === ''){
        //   newError.img = 'Image Can not Be Empty';
        //   isValid = false;
        // }
        setErrors(newError);
        return isValid;
      }
    const addProduct = async (e) => {
        e.preventDefault();
        if(validateForm()){         
            setIsLoading(true);
            const formData = new FormData();
            formData.append("name", name);
            formData.append("desc", desc);
            formData.append("stok", stok);
            formData.append("price", formattedPrice);
            formData.append("img", img);
            // const data = {
            //     name, desc, price, img
            // }
            try {
                const response = await axios.post('/products', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                });
                        setName('');
            setDesc('');
            setPrice('');
            setStok('');
            setImg(null);
            setPreviewUrl('');
            props.onClose();
            setIsLoading(false);
            } catch (error) {
                console.log(error)
            }
        }
        }
//    useEffect(() => {
    
//    })
    // const addProduct = (e) => {
    //     e.preventDefault()
    //     const data = {
    //         name, desc, price
    //     }
    //     Inertia.post('/products', data)
    //     setName('');
    //     setDesc('');
    //     setPrice('');
    //   };
    return (
        <>
            <AnimatePresence>
                {props.addModal ? (
                    <motion.div className="">
                        <motion.div
                            className="modall h-[100rem] modal-bg "
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
                                    onSubmit={addProduct}
                                    encType="multipart/form-data"
                                >
                                    <h1 htmlFor="">Add Product</h1>
                                    <label htmlFor="name">Name</label>
                                    {errors.name ? <p className="mt-3 text-xs text-red-400">{errors.name}</p> : ''}
                                    <input
                                        placeholder="Name"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />

                                    <label htmlFor="desc">Description</label>
                                    {errors.desc ? <p className="mt-3 text-xs text-red-400">{errors.desc}</p> : ''}
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
                                    {errors.price ? <p className="mt-3 text-xs text-red-400">{errors.price}</p> : ''}

                                    <input
                                        placeholder="price"
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        value={price}
                                        onChange={handlePriceChange
                                        }
                                    />
                                    <label htmlFor="stok">Stok</label>
                                    {errors.stok ? <p className="mt-3 text-xs text-red-400">{errors.stok}</p> : ''}

                                    <input
                                        placeholder="stok"
                                        type="number"
                                        id="stok"
                                        name="stok"
                                        className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
                                        value={stok}
                                        onChange={(e) => setStok(e.target.value) 
                                        }
                                    />
            
                                    <label htmlFor="img">Image</label>
                                    {/* {errors.img ? <p className="mt-3 text-xs text-red-400">{errors.img}</p> : ''} */}
                                    <input
                                        className="block"
                                        type="file"
                                        name="img"
                                        // value={img}
                                        onChange={handleImageChange}
                                        // value={thumbnail || ''}
                                        // onChange={handleThumbnailChange}
                                        accept='image/png, image/jpeg'
                                    />
                                    <div className=""> 
                                    {previewUrl && <img src={previewUrl} className="h-36" alt="Preview" />}

                                    </div>
                                    
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

export default AddModal;
