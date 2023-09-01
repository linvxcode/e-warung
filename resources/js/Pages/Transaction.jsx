import React, { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import axios from "axios";
import { motion } from "framer-motion";
import { format } from "date-fns";

// Note Payment Credit Card Simulator

//Card Number = 4811 1111 1111 1114
//CW = 123
//Date = 02/25

function Transaction(props) {
    // console.log(props);
    const [canceled, setCaceled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const payButtonRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "MIDTRANS_CLIENT_KEY");
        document.head.appendChild(script);

        script.onload = () => {
            if (payButtonRef.current) {
                payButtonRef.current.addEventListener(
                    "click",
                    handlePayButtonClick
                );
            }
        };

        return () => {
            if (payButtonRef.current) {
                payButtonRef.current.removeEventListener(
                    "click",
                    handlePayButtonClick
                );
            }
            script.onload = null;
        };
    }, []);

    const handleBatalkan = async (orderId) => {
        setIsLoading(true);
        try {
            const confirm = window.confirm("Do You Want To Cancel Order");

            if (confirm) {
                const response = await axios.post(`/orders/${orderId}/cancel`);
                window.location.href = "/transaction";
            }

            // if (response.status === 200) {
            //     setCaceled(true);
            //     alert("Do You Want To Cancel Order");
            // } else {
            //     console.log("Error canceling order");
            // }
        } catch (error) {
            console.log("Error:", error);
        }
        setIsLoading(false);
    };

    const handlePayButtonClick = async (e, orderId, snapToken) => {
        setIsLoading(true);
        e.preventDefault();
        snap.pay(snapToken, {
            onSuccess: function (result) {
                // alert("Payment success!");
                window.location.href = "/transaction";
                setIsLoading(false);

                const updateOrderStatus = async () => {
                    try {
                        const response = await axios.post(
                            `/orders/${orderId}`,
                            {
                                status: "Paid",
                            }
                        );

                        if (response.status) {
                            console.log("Order status updated to Paid");
                        } else {
                            console.log("Error updating order status");
                        }
                    } catch (error) {
                        console.log("Error:", error);
                    }
                };

                updateOrderStatus();
            },
            onPending: function (result) {
                alert("Waiting for your payment!");
                console.log(result);
            },
            onError: function (result) {
                alert("Payment failed!");
                console.log(result);
                window.location.href = "/transaction";
            },
            onClose: function () {
                alert("You closed the popup without finishing the payment");
                window.location.href = "/transaction";
            },
        });
    };

    const handlePesananDiterima = async (orderId) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`/orders/${orderId}/received`);
            if (response.status === 200) {
                window.location.href = "/transaction";
            }
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    };

    return (
        <>
            <Head title="Transaction" />
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
                className="relative sm:flex sm:justify-center  bg-center bg-white text-black selection:text-white"
                initial={{ opacity: 0, y: 20 }}
                transition={{
                    type: "spring",
                    bounce: 0.2,
                    duration: 1,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <div className="grid mt-5  gap-5 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 p-4 justify-center ">
                    {props.order.length > 0 ? (
                        <>
                            {props.order.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4   rounded-xl group flex space-x-6  bg-[#b1b0b066;] bg-opacity-50 shadow-xl hover:rounded-2xl"
                                >
                                    <div className="pl-0 p-5">
                                        <div className="space-y-2">
                                            <div className="space-y-4">
                                                <h4 className="text-md uppercase font-semibold text-cyan-900 text-justify">
                                                    {item.name}
                                                </h4>
                                            </div>
                                            <div className="flex items-center space-x-4 justify-between">
                                                <div className="flex gap-3 space-y-1">
                                                    <span className="text-sm u">
                                                        Product :{" "}
                                                        {item.products}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 justify-between">
                                                <div className="flex gap-3 space-y-1">
                                                    <span className="text-sm">
                                                        Harga :{" "}
                                                        {item.total_price
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                "."
                                                            )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 justify-between">
                                                <div className="flex gap-3 space-y-1">
                                                    <span className="text-sm">
                                                        Jumlah :{" "}
                                                        {item.qty}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 justify-between">
                                                <div className="flex gap-3 space-y-1">
                                                    <span className="text-sm">
                                                        No HP : {item.phone}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4 justify-between">
                                                <div className="flex gap-3 space-y-1">
                                                    <span className="text-sm">
                                                        Status : {item.status}
                                                    </span>
                                                </div>
                                            </div>
                                            {item.status === "Paid" ? (
                                                <>
                                                {item.received === 'Received' ? (
                                                    <>
                                                    </>
                                                ): (

                                                    <div className="flex items-center space-x-4 justify-between">
                                                    <div className="flex gap-3 space-y-1">
                                                        <span className="text-sm font-semibold">
                                                            Mohon Menunggu Selama 5 Menit
                                                        </span>
                                                    </div>
                                                </div>
                                                    )}
                                                </>
                                            ) : (
                                                ""
                                            )}
                                            <div className="grid max-md:grid-cols-1 items-center space-x-4 justify-between">
                                                <div className="text-grey-500 flex flex-row space-x-1  my-4">
                                                    <svg
                                                        stroke="currentColor"
                                                        fill="none"
                                                        strokeWidth="0"
                                                        viewBox="0 0 24 24"
                                                        height="1em"
                                                        width="1em"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                        ></path>
                                                    </svg>

                                                    <p className="text-xs">
                                                        {format(
                                                            new Date(
                                                                item.created_at
                                                            ),
                                                            "dd/MM/yyyy"
                                                        )}
                                                    </p>
                                                </div>

                                                {item.cancel === "Pending" ? (
                                                    <div className="flex items-center flex-row gap-2 flex-wrap  justify-center">
                                                        <div className="">
                                                            {item.status ===
                                                            "Paid" ? (
                                                                <div className="flex flex-wrap justify-center w-[100%]">
                                                                    <div 
                                                                    className={item.received === 'Received' ? 'flex mb-3 flex-wrap items-center justify-center alert btn-neutral' : 'flex mb-3 flex-wrap items-center justify-center alert btn-success'}
                                                                    // className="flex mb-3 flex-wrap items-center justify-center alert alert-success"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            className="stroke-current shrink-0 h-6 w-5"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                            />
                                                                        </svg>
                                                                        <span>
                                                                            {item.received ===
                                                                            "Received" ? (
                                                                                <div className="flex justify-center w-[100%]">
                                                                                <h1>
                                                                                Pesanan
                                                                                    Telah
                                                                                    Diterima
                                                                                </h1>
                                                                                    
                                                                                </div>
                                                                            ) : (
                                                                                "Paid"
                                                                            )}
                                                                            {/* Paid */}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex justify-center w-[100%] flex-col flex-wrap">
                                                                        {item.received ===
                                                                        "Received" ? (
                                                                            <>
                                                                                {/* <h1>Pesanan Telah Diterima</h1> */}
                                                                            </>
                                                                        ) : (
                                                                            <button
                                                                                onClick={() =>
                                                                                    handlePesananDiterima(
                                                                                        item.id
                                                                                    )
                                                                                }
                                                                                className="btn btn-outline"
                                                                            >
                                                                                Pesanan
                                                                                Diterima
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-row gap-3 flex-wrap  justify-center">
                                                                    <div className="div mb-3">
                                                                        <button
                                                                            id="payButton"
                                                                            // ref={payButtonRef}
                                                                            onClick={(
                                                                                e
                                                                            ) =>
                                                                                handlePayButtonClick(
                                                                                    e,
                                                                                    item.id,
                                                                                    item.snap_token
                                                                                )
                                                                            }
                                                                            className="btn btn-outline"
                                                                        >
                                                                            Pay
                                                                        </button>
                                                                    </div>
                                                                    <div className="div">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleBatalkan(
                                                                                    item.id
                                                                                )
                                                                            }
                                                                            className="btn btn-outline"
                                                                        >
                                                                            Batalkan
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <h1 className="text-lg font-semibold text-red-500">
                                                            {item.cancel}
                                                        </h1>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        "Tidak Ada Transaksi"
                    )}
                </div>
            </motion.div>
        </>
    );
}

export default Transaction;
