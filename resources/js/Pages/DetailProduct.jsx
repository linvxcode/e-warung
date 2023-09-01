import { Head, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Transaction from "./Transaction";
// import { snap } from "midtrans-client";
import { motion } from "framer-motion";
import Navbar from "@/Components/Navbar";

function DetailProduct(props) {
    const { product } = usePage().props;
    // console.log(props);
    const [counter, setCounter] = useState(1);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [errors, setErrors] = useState("");
    // const [products, setProducts] = useState('');
    // const [name , ]
    const [isLoading, setIsloading] = useState(false);

    function plus() {
        setCounter(counter + 1);
    }

    const minus = () => {
        if (counter === 1) {
            return;
        }
        setCounter(counter - 1);
    };

    const getImageUrl = (image) => {
        if (image) {
            return image.startsWith("http") ? image : `/storage/${image}`;
        } else {
            return "/images/fallback-image.jpg"; // Path to the fallback image
        }
    };

    const validateForm = () => {
        const newError = {};
        let isValid = true;
        // if (address.trim() === "") {
        //     newError.address = "Address Can not Be Empty";
        //     isValid = false;
        // }
        if (phone.trim() === "") {
            newError.phone = "Phone Can not Be Empty";
            isValid = false;
        }
        setErrors(newError);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsloading(true);
            try {
                const userId = props.auth.user.id;
                const response = await axios.post("/init-payment", {
                    products: product.name,
                    name: props.auth.user.name,
                    address: address,
                    qty: counter,
                    total_price: product.price * counter,
                    phone: phone,
                    user_id: userId,
                });

                const { snapToken, orderId } = response.data;

                Inertia.visit("/transaction");
                // Inertia.visit(`/payment-page/${orderId}?token=${snapToken}`);
                setIsloading(false);

                // const { snapToken, total_price } = response.data;

                //     Inertia.visit(`/payment-page?token=${snapToken}&total_price=${total_price}&name=${product.name}`);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleKeranjang = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const userId = props.auth.user.id;
                const response = await axios.post("/init-payment", {
                    products: product.name,
                    name: props.auth.user.name,
                    address: address,
                    qty: counter,
                    total_price: product.price * counter,
                    phone: phone,
                    user_id: userId,
                });

                const { snapToken, orderId } = response.data;
                Inertia.visit("/transaction");
            } catch (error) {
                console.log(error);
            }
        }
    };

    // const handlePayment = async () => {
    //     let snapToken;
    //     try {
    //       const response = await axios.post("/create-order", {
    //         name: product.name,
    //         address: "Sample Address", // Replace with the user's address
    //         phone: "1234567890", // Replace with the user's phone number
    //         qty: counter,
    //         total_price: product.price * counter,
    //       });
    //     //   console.log(response.data)
    //       snapToken = response.data.snapToken;
    //     //   console.log(snapToken)

    //     //   // Redirect to Midtrans payment page
    //     // //   midtrans.snap.pay(snapToken);
    //       window.location.href = `/payment/snap/${snapToken}`;
    //     } catch (error) {
    //       console.log(error);
    //       // Handle error
    //     }
    //   };

    // const handlePayment = async () => {
    //     try {
    //       const snap = new midtrans.Snap({
    //         isProduction: false, // Set to true for production environment
    //         serverKey: "YOUR_SERVER_KEY",
    //         clientKey: "YOUR_CLIENT_KEY",
    //       });

    //       const transactionDetails = {
    //         orderId: "ORDER_ID",
    //         grossAmount: product.price * counter,
    //       };

    //       const itemDetails = [
    //         {
    //           id: product.id,
    //           price: product.price,
    //           quantity: counter,
    //           name: product.name,
    //         },
    //       ];

    //       const customerDetails = {
    //         firstName: "John",
    //         lastName: "Doe",
    //         email: "john.doe@example.com",
    //         phone: "1234567890",
    //       };

    //       const response = await snap.createTransaction({
    //         transactionDetails,
    //         itemDetails,
    //         customerDetails,
    //       });

    //       // Redirect to Midtrans payment page
    //       window.location.href = response.redirect_url;
    //     } catch (error) {
    //       console.log(error);
    //       // Handle error
    //     }
    //   };

    return (
        <>
            <Head title={product.name} />
            {isLoading ? (
                <>
                    <div className="fixed modal-bg h-screen w-screen z-[9999]">
                        <div className="flex justify-center items-center justify-items-center w-screen h-screen">
                            <span className="text-white loading loading-dots loading-lg"></span>
                        </div>
                    </div>
                </>
            ) : (
                ""
            )}
            <Navbar props={props} />
            <motion.div
                className="relative sm:flex sm:justify-center sm:items-center bg-center bg-white text-black selection:text-white"
                initial={{ opacity: 0, y: 20 }}
                transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 1,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="sm:absolute w-full sm:top-0 sm:right-0 p-6 text-right">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 max-md:h-screen max-md:flex max-md:flex-col max-md:grid-cols-1 gap-5">
                            <div className="max-md:h-[30%]">
                                <img
                                    className="h-[100%] w-[100%] max-md:w-auto  rounded-md"
                                    src={getImageUrl(product.img)}
                                    alt="error"
                                />
                            </div>

                            <div className="flex justify-start flex-col">
                                <h1 className="flex justify-start font-semibold text-3xl text-gray-800 leading-tight">
                                    {product.name}
                                    <input
                                        type="hidden"
                                        id="name"
                                        name="name"
                                        value={props.auth.user.name}
                                    />
                                </h1>
                                <h1 className="flex font-thin mt-1 text-start text-sm text-gray-800 t">
                                    

                                </h1>
                                <h2 className="flex font-semibold mt-5 text-start text-lg text-gray-800 t">
                                    {product.desc}
                                    <input
                                        type="hidden"
                                        id="desc"
                                        name="desc"
                                        value={product.desc}
                                    />
                                </h2>
                                <h2 className="flex justify-start mt-3 font-semibold text-2xl text-red-500 leading-tight">
                                    Rp
                                    {product.price
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                    <input
                                        type="hidden"
                                        id="price"
                                        name="price"
                                        value={product.price}
                                    />
                                </h2>
                                <h1 className="flex justify-start mt-3 items-center">
                                    Tersisa {product.stok}
                                    <input
                                        type="hidden"
                                        id="stok"
                                        name="stok"
                                        value={product.stok}
                                    />
                                </h1>
                                {/* <div className="flex justify-start mt-3 items-center">
                                    {errors.address ? (
                                        <p className="mt-3 text-xs text-red-400">
                                            {errors.address}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex justify-start items-center">
                                    <label htmlFor="address"></label>
                                    <input
                                        type="text"
                                        className={
                                            errors.address
                                                ? "input input-bordered input-error w-full max-w-xs"
                                                : "input input-bordered w-full max-w-xs"
                                        }
                                        placeholder="address"
                                        name="address"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </div> */}

                                <div className="flex justify-start mt-3 items-center">
                                    {errors.phone ? (
                                        <p className="mt-3 text-xs text-red-400">
                                            {errors.phone}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="flex justify-start items-center">
                                    <label htmlFor="phone"></label>
                                    <input
                                        type="tel"
                                        className={
                                            errors.phone
                                                ? "input input-bordered input-error w-full max-w-xs"
                                                : "input input-bordered w-full max-w-xs"
                                        }
                                        placeholder="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-3 border-2 w-[40%] h-[35px] mt-5">
                                    <button
                                        type="button"
                                        onClick={minus}
                                        className="border-x-2 flex justify-center items-center"
                                    >
                                        -
                                    </button>
                                    <h1 className="border-x-2 flex justify-center items-center">
                                        {counter}

                                        <input
                                            type="hidden"
                                            id="qty"
                                            name="qty"
                                            value={counter}
                                        />
                                    </h1>
                                    <button
                                        type="button"
                                        onClick={plus}
                                        className="border-x-2 flex justify-center items-center"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="flex max-md:flex-col gap-3 mt-3">
                                    <button
                                        onClick={handleKeranjang}
                                        className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                                    >
                                        Masukan Keranjang
                                    </button>
                                    <button
                                        type="submit"
                                        className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                                    >
                                        Beli Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </motion.div>

            {/* </div> */}
        </>
    );
}

export default DetailProduct;
