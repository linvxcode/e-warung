import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import { motion } from "framer-motion";
import { format } from "date-fns";

function AdminTransaction(props) {
    // console.log(props);
    const [isLoading, setIsLoading] = useState(false);
    const [order, setOrder] = useState([]);

    const getOrder = async () => {
        try {
            const response = await axios.get("/orders");
            setOrder(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    const handlePayButtonClick = async (orderId) => {
        setIsLoading(true);
        try {
            const confirmPay = window.confirm("Are you sure you want to pay?");

            if (confirmPay) {
                const response = await axios.post(`/orders/${orderId}`, {
                    status: "Paid",
                });
                getOrder();

                // Inertia.visit("/dashboard/admin-transaction");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleAccept = async (orderId) => {
        try {
            const confirmCancel = window.confirm(
                "Are you sure you want to cancel this order?"
            );
            setIsLoading(true);

            if (confirmCancel) {
                const deleteResponse = await axios.post(
                    `/orders/${orderId}/delete`
                );
                getOrder();
            }
            setIsLoading(false);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const handleContinueOrder = async (orderId) => {
        setIsLoading(true);
        try {
            const confirm = window.confirm("Continue Order?");

            if (confirm) {
                const response = await axios.put(`/orders/${orderId}/continue`);
                getOrder();
            }
        } catch (error) {
            console.log("Error:", error);
        }
        setIsLoading(false);
    };

    return (
        <>
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
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Transaction
                    </h2>
                }
            >
                <Head title="Admin Transaction" />

                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <div className="relative sm:flex sm:justify-center  bg-center bg-white text-black selection:text-white">
                                    <motion.div
                                        className="grid mt-5  gap-5 max-md:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 p-4 justify-center "
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 1,
                                        }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                    >
                                        {order.length > 0 ? (
                                            <>
                                                {order.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="p-4   rounded-xl group flex space-x-6  bg-[#b1b0b066;] bg-opacity-50 shadow-xl hover:rounded-2xl"
                                                    >
                                                        <div className="pl-0 p-5">
                                                            <div className="space-y-2">
                                                                <div className="space-y-4">
                                                                    <h4 className="text-md uppercase font-semibold text-cyan-900 text-justify">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </h4>
                                                                </div>
                                                                <div className="flex items-center space-x-4 justify-between">
                                                                    <div className="flex gap-3 space-y-1">
                                                                        <span className="text-sm u">
                                                                            Product
                                                                            :{" "}
                                                                            {
                                                                                item.products
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-4 justify-between">
                                                                    <div className="flex gap-3 space-y-1">
                                                                        <span className="text-sm u">
                                                                            Phone
                                                                            :{" "}
                                                                            {
                                                                                item.phone
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-4 justify-between">
                                                                    <div className="flex gap-3 space-y-1">
                                                                        <span className="text-sm">
                                                                            Harga
                                                                            :{" "}
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
                                                                            Jumlah
                                                                            Pesanan
                                                                            :{" "}
                                                                            {
                                                                                item.qty
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-4 justify-between">
                                                                    <div className="flex gap-3 space-y-1">
                                                                        <span className="text-sm">
                                                                            Status
                                                                            :{" "}
                                                                            {item.received === 'Received' ? (
                                                                                <>
                                                                                Pesanan Telah Diterima
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                {
                                                                                    item.status
                                                                                }
                                                                                </>
                                                                                )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center space-x-4 justify-between">
                                                                    <div className="flex gap-3 space-y-1">
                                                                        <span className="text-sm">
                                                                            {item.cancel ===
                                                                            "Canceled" ? (
                                                                                <>
                                                                                    <h1 className="text-lg font-semibold text-red-500">
                                                                                        {
                                                                                            item.cancel
                                                                                        }
                                                                                    </h1>
                                                                                </>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                            {/* Pembayaran : {item.status} */}
                                                                        </span>
                                                                    </div>
                                                                </div>
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

                                                                    {item.cancel ===
                                                                    "Pending" ? (
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
                                                                                                className="stroke-current shrink-0 h-6 w-6"
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
                                                                                                    <div className="flex items-center justify-center w-[100%]">
                                                                                                        <h1>
                                                                                                            Paid
                                                                                                        </h1>
                                                                                                    </div>
                                                                                                )}
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className="flex gap-3 flex-row  flex-wrap  justify-center">
                                                                                        <div className="div mb-3">
                                                                                            <button
                                                                                                id="payButton"
                                                                                                // ref={payButtonRef}
                                                                                                onClick={() =>
                                                                                                    handlePayButtonClick(
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                                className="btn btn-outline"
                                                                                            >
                                                                                                Already
                                                                                                Paid
                                                                                            </button>
                                                                                        </div>
                                                                                        <div className="div">
                                                                                            <button
                                                                                                onClick={() =>
                                                                                                    handleAccept(
                                                                                                        item.id
                                                                                                    )
                                                                                                }
                                                                                                className="btn btn-outline"
                                                                                            >
                                                                                                Cancel
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                    {item.cancel ===
                                                                    "Canceled" ? (
                                                                        <div className="flex flex-row flex-wrap gap-3 justify-center">
                                                                            <div className="div">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleAccept(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="btn btn-outline"
                                                                                >
                                                                                    Accept
                                                                                </button>
                                                                            </div>
                                                                            <div className="div">
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleContinueOrder(
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="btn btn-neutral"
                                                                                >
                                                                                    Continue
                                                                                    Order
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        ""
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
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default AdminTransaction;
