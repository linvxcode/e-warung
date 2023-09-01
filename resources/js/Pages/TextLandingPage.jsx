import React from "react";
import { motion} from "framer-motion";
import { Link } from "@inertiajs/react";

function TextLandingPage(props) {
    console.log("Text", props)
    // initial={{opacity: 0, x: -500}} transition={{type: "spring",bounce: 0.2,duration: 0.8}} animate={{opacity: 1, x: 0}} 

    // const Efek = {
//     offscreen: {
//       x: -500
//     },
//     onscreen: {
//       x: 0,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         bounce: 0.2,
//         duration: 0.9
//       }
//     }
//   };
    return (
        <div>
            <div className="grid h-screen">
                <div className="quote max-sm:p-16">
                    <motion.div className="content w-[100%] block"
                                  initial={{opacity: 0, y: 100}}
                                  transition={{type: "spring",bounce: 0.2,duration: 1}}
                                  whileInView={{ opacity: 1, y: 0}}
                                  viewport={{ once: true }}
                    >
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold  table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            E
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell  max-md:text-5xl max-[525px]:text-4xl "
                        >
                            -
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            W
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            a
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            r
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            u
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            n
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            g
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-6xl pr-6 font-semibold table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            .
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            B
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            U
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            N
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            G
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            J
                        </motion.span>
                        <motion.span
                            whileHover={{
                                scale: 1.25,
                                transition: {duration: 0.1}
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 1000,
                                damping: 10,
                            }}
                            drag
                            dragConstraints={{
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                            }}
                            className="text-ex table-cell max-md:text-5xl max-[525px]:text-4xl "
                        >
                            M
                        </motion.span>

                            


                        <motion.div className="mt-3"
                                      initial={{opacity: 0, x: -200}}
                                      transition={{type: "spring",bounce: 0.2,duration: 0.8, delay: 0.2}}
                                      whileInView={{ opacity: 1,x: 0}}
                                      viewport={{ once: true }}
                        >

                            <Link
                                href="/shop"
                                className="  bg-gray-950 text-gray-50 p-2 btn-hover transition-all rounded-3xl"
                            >
                                Shop Now
                            </Link>
                        </motion.div>
                                    <Link
                href={
                    props.user
                        ? route("shop")
                        : route("login")
                }
                // props={props}
                className=""
            >

            

                        <motion.div
                className="carousel mt-10 h-[400px] img-1 carousel-center rounded-box"
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
                    <img src="/img/product/malboro.jpg" alt="Pizzaa" />
                </motion.div>
                <motion.div
                    // whileHover={{
                    //         scale: 1.2,
                    //     }}
                    className="carousel-item"
                >
                    <img src="/img/product/aquaa.jpg" alt="Pizzaa" />
                </motion.div>
                <motion.div
                    // whileHover={{
                    //         scale: 1.2,
                    //     }}
                    className="carousel-item"
                >
                    <img src="/img/product/hilo.jpeg" alt="Pizza" />
                </motion.div>
                <motion.div
                    // whileHover={{
                    //         scale: 1.2,
                    //     }}
                    className="carousel-item"
                >
                    <img src="/img/product/oreo.jpeg" alt="Pizza" />
                </motion.div>
                <motion.div
                    // whileHover={{
                    //         scale: 1.2,
                    //     }}
                    className="carousel-item"
                >
                    <img src="/img/6.jpg" alt="Pizza" />
                </motion.div>
                
            </motion.div>
            </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default TextLandingPage;
