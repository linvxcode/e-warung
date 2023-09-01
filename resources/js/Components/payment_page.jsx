import React, { useEffect, useState, useRef } from "react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import Navbar from "@/Components/Navbar";

function PaymentPage(props) {
    // console.log("payment", props)    
    const [createdTime, setCreatedTime] = useState("");
    const [result, setResult] = useState("");
    const [stat, setStat] = useState("");
    // console.log(props)
    // useEffect(() => {
    //   const script = document.createElement('script');
    //   script.type = 'text/javascript';
    //   script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //   script.setAttribute('data-client-key', 'MIDTRANS_CLIENT_KEY'); // Replace 'CLIENT-KEY' with your actual client key

    //   script.onload = () => {
    //     // window.snap.pay(props.token);
    //     const payButton = document.getElementById('payButton');

    //     payButton.addEventListener('click', () => {
    //       window.snap.pay(props.token);
    //     });
    //   };

    //   document.body.appendChild(script);

    //   return () => {
    //     document.body.removeChild(script);

    //   };

    // }, [props.token]);
    const payButtonRef = useRef(null);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; // Replace with the appropriate script source
        script.setAttribute("data-client-key", "MIDTRANS_CLIENT_KEY"); // Replace with your client key
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

    const handlePayButtonClick = async (e) => {
        e.preventDefault();
        snap.pay(props.token, {
            onSuccess: function (result) {
                // Payment success
                alert("Payment success!");
                setResult(result);
                // console.log(result);

                // Send POST request to update order status
                const updateOrderStatus = async () => {
                    try {
                        const response = await axios.post(
                            "/orders/" + props.orderId,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    status: "Paid",
                                }),
                            }
                        );

                        if (response.ok) {
                            // Order status updated successfully
                            console.log("Order status updated to Paid");
                        } else {
                            // Error updating order status
                            console.log("Error updating order status");
                        }
                    } catch (error) {
                        console.log("Error:", error);
                    }
                };

                updateOrderStatus();
                // console.log(updateOrderStatus);
            },
            onPending: function (result) {
                /* You may add your own implementation here */
                alert("Waiting for your payment!");
                console.log(result);
            },
            onError: function (result) {
                /* You may add your own implementation here */
                alert("Payment failed!");
                console.log(result);
            },
            onClose: function () {
                /* You may add your own implementation here */
                alert("You closed the popup without finishing the payment");
            },
        });
    };

    useEffect(() => {
        // Format the created_at time
        const createdDate = new Date(props.orderCreated_at);
        const createdTimeString = createdDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        setCreatedTime(createdTimeString);
    }, [props.orderCreated_at]);

    return (
        <>
            {/* <h1>Product Details</h1> */}
            {/* <p>Username: {props.auth.user.name}</p>
      <p>Product name: {props.orderName}</p> */}

            {/* <div>Loading...</div> */}
            <Head title="Payment" />
            <Navbar props={props} />

            <div className="flex items-center justify-center min-h-screen ">
                <div className="p-4 items-center justify-center w-[40%] rounded-xl group sm:flex space-x-6  bg-[#b1b0b066;] bg-opacity-50 shadow-xl hover:rounded-2xl">
                    <div className="sm:w-8/12 pl-0 p-5">
                        <div className="space-y-2">
                            <div className="space-y-4">
                                <h4 className="text-md uppercase font-semibold text-cyan-900 text-justify">
                                    {props.auth.user.name}
                                </h4>
                            </div>
                            <div className="flex items-center space-x-4 justify-between">
                                <div className="flex gap-3 space-y-1">
                                    <span className="text-sm u">
                                        Product : {props.orderName}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 justify-between">
                                <div className="flex gap-3 space-y-1">
                                    <span className="text-sm">
                                        Harga : {props.orderTotalPrice}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 justify-between">
                                <div className="flex gap-3 space-y-1">
                                    <span className="text-sm">
                                        Status : {props.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 justify-between">
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
                                    <p className="text-xs">{createdTime}</p>
                                </div>

                                {props.orderStatus === 'Paid' ? (
                                    <div className="">
                                        <h1>                                               
                                            Succeed
                                        </h1>
                                    </div>
                                ) : (
                                    <div className="div">
                                        <button
                                            id="payButton"
                                            ref={payButtonRef}
                                            className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                                        >
                                            Pay
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentPage;
