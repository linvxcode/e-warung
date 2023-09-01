import React, { useEffect, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { motion } from "framer-motion";

function Shop(props) {
    // console.log(props)
    const [product, setProduct] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);
    // const [imageIsload, setImgIsLoad] = useState(false);

    const getProduct = async () => {
        try {
            const response = await axios.get("/products", {
                params: {
                    search: searchQuery,
                },
            });
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getImageUrl = (image) => {
        if (image) {
            return image.startsWith("http") ? image : `/storage/${image}`;
        } else {
            return "/images/fallback-image.jpg";
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const filteredSearchItems = product.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastItem = (page + 1) * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const paginatedItems = filteredSearchItems.slice(
        indexOfFirstItem,
        indexOfLastItem
    );

    return (
        <>
            <Head title="Shop" />
            <Navbar props={props} />

            <div className="flex">
                <TextField
                    label="Search"
                    value={searchQuery || ""}
                    onChange={handleSearchChange}
                    sx={{ ml: 2 }}
                />
            </div>
            <motion.div
                className="relative  sm:flex sm:justify-center sm:items-center bg-center bg-white text-black selection:text-white"
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
                    <div className="grid mt-16 gap-5 grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[450px]:grid-cols-1 justify-items-center">
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <div className="cardd" key={index}>
                                    <Link
                                        href={
                                            props.auth.user
                                                ? route("detailproduct", {
                                                      productId: item.id,
                                                  })
                                                : route("login")
                                        }
                                        data={product}
                                        // props={props}
                                        className=""
                                    >
                                        <div className=" flex flex-col items-start">
                                            <div className="card-image">
                                                <img
                                                    className="h-[180px] object-cover w-[100%] rounded-md"
                                                    src={getImageUrl(item.img)}
                                                    alt="error"
                                                />
                                            </div>

                                            <div className="category">
                                                <h1>
                                                    Rp{" "}
                                                    <span className="text-xl">
                                                        {/* {item.price}{" "} */}
                                                        {item.price
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                "."
                                                            )}
                                                    </span>
                                                </h1>
                                            </div>
                                            <div className="heading">
                                                {item.name}
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="px-2">
                                        <button className="btn btn-ghost">
                                            {/* <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                                        />
                                                    </svg> */}
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>Tidak Ada Produk</h1>
                        )}
                    </div>

                    <div className="flex justify-center mb-10 mt-10">
                        <TablePagination
                            rowsPerPageOptions={[8, 16, 24]} // Customize the rows per page options as needed
                            component="div"
                            count={filteredSearchItems.length}
                            page={page}
                            onPageChange={(event, newPage) => setPage(newPage)}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={(event) => {
                                setRowsPerPage(
                                    parseInt(event.target.value, 10)
                                );
                                setPage(0);
                            }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* </div> */}
        </>
    );
}

export default Shop;
