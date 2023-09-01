import React from "react";
import { Link } from "@inertiajs/react";
import Footer from "./Footer";
import TextLandingPage from "./TextLandingPage";
import { motion } from "framer-motion";
import { transform } from "lodash";

function Landing_Page({props}) {
    // console.log(props)
    return (
        <div>
            <TextLandingPage props={props} />

            <div className="grid grid-cols-2 max-md:grid-cols-1 ">
                <div className="relative w-auto max-md:p-0  div-welcome bg-color">
                    <motion.h1
                        className="p-6 text-3xl max-md:text-xl text-left text-ex text-white"
                        initial={{ opacity: 0, x: -40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.8,
                            delay: 0.2,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        Welcome to Simplistic E-Warung
                    </motion.h1>
                </div>
                <div className="relative overflow-hidden max-md:p-0 w-auto div-welcome bg-color">
                    <motion.h1
                        className="p-6 font-sch text-white"
                        initial={{ opacity: 0, x: -40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.8,
                        }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        shopping has never been so easy! We’ve stocked our
                        virtual shelves with the latest trends and jaw-dropping
                        deals—heaven if you’re a shopaholic!
                    </motion.h1>
                </div>
            </div>
            <div className="quote max-sm:p-16">
                <div className="content">
                    <motion.h1
                        className="text-ex max-sm:text-3xl max-md:text-5xl"
                        initial={{ opacity: 0, y: 40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 1,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Experience shopping reimagined.
                    </motion.h1>
                </div>
            </div>
                <motion.div
                    className="carousel h-[400px] img-1 carousel-center rounded-box"
                    //   initial={{ opacity: 0 }}
                    initial={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >

                    <motion.div
                        className="carousel-item"
                        // whileHover={{
                        //     scale: 1.2,
                        // }}
                    >
                        <img src="/img/1.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/2.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/3.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/5.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/6.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/4.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/7.jpg" alt="Pizza" />
                    </motion.div>
                    <motion.div
                        // whileHover={{
                        //         scale: 1.2,
                        //     }}
                        className="carousel-item"
                    >
                        <img src="/img/8.jpg" alt="Pizza" />
                    </motion.div>
                </motion.div>

            <div>
                {/* <div className="grid grid-cols-2 max-md:justify-items-center max-md:grid-cols-1 gap-5 p-2">
                <div className="img-item">
                    <img
                        className="img-1"
                        src="https://th.bing.com/th/id/OIP.HefMfywF7Aq6l7eE4aMZ2gHaEK?pid=ImgDet&rs=1"
                        alt="eror"
                    />
                </div>
                <div className="img-item">
                    <img
                        className="img-1"
                        src="https://i1.wp.com/bolasalju.com/wp-content/uploads/2016/10/roti-2016-cover.png?resize=750%2C410&ssl=1"
                        alt="eror"
                    />
                </div>
                <div className="img-item">
                    <img
                        className="img-1"
                        src="https://th.bing.com/th/id/OIP.3hap8BahPnYbRUPtl5LAlgHaEo?pid=ImgDet&rs=1"
                        alt="eror"
                    />
                </div>
                <div className="img-item">
                    <img
                        className="img-1"
                        src="https://i.ytimg.com/vi/Ut6ceP4Dz9Q/maxresdefault.jpg"
                        alt="eror"
                    />
                </div>
            </div> */}
            </div>

            <div className="p-2 mt-10 mb-10 flex flex-col flex-wrap items-center">
                <motion.div
                    className="bg-color mb-5 rounded-3xl w-[90%] max-sm:w-[100%] p-3 grid grid-cols-2"
                    initial={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/shop"
                        className="text-white text-3xl max-sm:text-xl font-extrabold items-center flex"
                    >
                        Join Today
                    </Link>
                    <div className="text-white text-4xl text-end">&gt;</div>
                </motion.div>
                <motion.div
                    className="border-gray-600 border-2 mt-3 rounded-3xl max-sm:w-[100%] w-[90%] p-3 grid grid-cols-2"
                    initial={{ opacity: 0, y: 40 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 1 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link
                        href="/shop"
                        className="text-gray-600 text-3xl max-sm:text-xl font-extrabold items-center flex"
                    >
                        Explore Product
                    </Link>
                    <div className="text-gray-600 text-4xl text-end">&gt;</div>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 p-2 gap-5 overflow-hidden">
                <motion.div
                    className="grid grid-cols-1 p-5 text-center"
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.2,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-7xl max-sm:text-6xl font-extrabold ">
                        10K
                    </h1>
                    <h1 className="text-5xl max-sm:text-2xl">Product</h1>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 p-5 text-center overflow-hidden"
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.2,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-7xl font-extrabold max-sm:text-6xl">
                        500{" "}
                    </h1>
                    <h1 className="text-5xl max-sm:text-2xl">Brand</h1>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 p-5 text-center"
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.2,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-7xl font-extrabold max-sm:text-6xl">
                        50K{" "}
                    </h1>
                    <h1 className="text-5xl max-sm:text-2xl">Customer</h1>
                </motion.div>
                <motion.div
                    className="grid grid-cols-1 p-5 text-center"
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.2,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h1 className="text-7xl font-extrabold max-sm:text-6xl">
                        24/7{" "}
                    </h1>
                    <h1 className="text-5xl max-sm:text-2xl">Support</h1>
                </motion.div>
            </div>

            <div className="p-2 flex flex-col flex-wrap items-center overflow-hidden">
                <motion.div
                    className=" bg-black rounded-3xl w-[90%] max-sm:w-[100%] flex flex-1 "
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.2,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="text-3xl w-16 p-3"
                        initial={{ opacity: 0, y: 40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 1,
                            delay: 0.2,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                        >
                            <path
                                d="M 7.5 27 L 18 37.5 L 42 13.5"
                                fill="transparent"
                                strokeWidth="4.5"
                                stroke="#FFFFFF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </motion.div>
                    <div className="flex p-3 items-center">
                        <h1 className="text-white text-3xl max-sm:text-xl">
                            Secure Payment
                        </h1>
                    </div>
                </motion.div>
                <motion.div
                    className="mt-3 bg-black rounded-3xl w-[90%] max-sm:w-[100%] flex flex-1 "
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.4,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="text-3xl w-16 p-3"
                        initial={{ opacity: 0, y: 40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 1,
                            delay: 0.4,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                        >
                            <path
                                d="M 7.5 27 L 18 37.5 L 42 13.5"
                                fill="transparent"
                                strokeWidth="4.5"
                                stroke="#FFFFFF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </motion.div>
                    <div className="flex p-3 items-center">
                        <h1 className="text-white text-3xl max-sm:text-xl">
                            Global Shiping
                        </h1>
                    </div>
                </motion.div>
                <motion.div
                    className="mt-3 bg-black rounded-3xl w-[90%] max-sm:w-[100%] flex flex-1 "
                    initial={{ opacity: 0, x: 40 }}
                    transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 1,
                        delay: 0.5,
                    }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="text-3xl w-16 p-3"
                        initial={{ opacity: 0, y: 40 }}
                        transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 1,
                            delay: 0.5,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                        >
                            <path
                                d="M 7.5 27 L 18 37.5 L 42 13.5"
                                fill="transparent"
                                strokeWidth="4.5"
                                stroke="#FFFFFF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </motion.div>
                    <div className="flex p-3 items-center">
                        <h1 className="text-white text-3xl max-sm:text-xl">
                            Easy Return
                        </h1>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}

export default Landing_Page;
