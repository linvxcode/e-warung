import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ConfirmationDialog from "@/Components/ConfirmationDialog";
import EditModal from "@/Components/EditModal";
import AddModal from "../AddModal";
import axios from "axios";
import { motion } from "framer-motion";
import TablePagination from "@mui/material/TablePagination";

function AddProduct(props) {
    const [addModal, setAddModal] = useState(false);
    const [product, setProduct] = useState([]);
    const [editModal, setEditModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [imageIsload, setImgIsLoad] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    // console.log(props)

    const handleAddModal = () => {
        setAddModal(true);
    };
    const handleCloseAddModal = async () => {
        setAddModal(false);
        await getProduct();
    };

    const handleEdit = (productId) => {
        setEditModal(true);
        setSelectedPostId(productId);
    };

    const handleCloseEditModal = async () => {
        setEditModal(false);
        setSelectedPostId(null);
        await getProduct();
    };

    // const totalEarning = order.reduce((total, item) => {
    //     if (item.status === "Paid") {
    //         return total + item.total_price;
    //     } else {
    //         return total;
    //     }
    // }, 0);

    // const getOrder = async () => {
    //     try {
    //         const response = await axios.get("/orders");
    //         setOrder(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    const getProduct = async (e) => {
        // e.preventDefault();
        setImgIsLoad(true);
        try {
            const response = await axios.get("/products");
            setProduct(response.data);
        } catch (error) {
            console.log(error);
        }
        setImgIsLoad(false);
    };

    const handleDelete = (productId) => {
        setSelectedProductId(productId);
        setConfirmationOpen(true);
    };

    const handleCancelDelete = () => {
        setConfirmationOpen(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`/products/${selectedProductId}`);
            await getProduct();
            // await getOrder();
            setConfirmationOpen(false);
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
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0); 
    };

    useEffect(() => {
        getProduct();
    }, [currentPage, rowsPerPage]);
    return (
        <>
            <AuthenticatedLayout
                auth={props.auth}
                errors={props.errors}
                header={
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Product
                    </h2>
                }
            >
                <Head title="Add Product" />

                <div className="mt-5">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <motion.div
                                className="p-6 text-gray-900"
                                initial={{ opacity: 0, y: 20 }}
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 1,
                                }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <h1 className="font-semibold text-xl text-gray-800 leading-tight mb-5 mt-5">
                                    Product
                                </h1>
                                {/* <h1>
                                    {props.auth.user.name} You're logged in!
                                </h1> */}
                                <div className="mb-3 ">
                                    <button
                                        className="border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline"
                                        onClick={handleAddModal}
                                    >
                                        Add Product
                                    </button>
                                </div>

                                <div className="grid gap-5 grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-[450px]:grid-cols-1 justify-items-center">
                                    {product.length > 0 ? (
                                        product
                                            .slice(
                                                currentPage * rowsPerPage,
                                                currentPage * rowsPerPage +
                                                    rowsPerPage
                                            )
                                            .map((item, index) => (
                                                <div
                                                    className="cardd"
                                                    key={index}
                                                >
                                                    <a
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            handleEdit(item.id)
                                                        }
                                                    >
                                                        {imageIsload ? (
                                                            <div className="card-image animate-pulse ">
                                                                <h1 className="flex justify-center h-[169px] w-[100%] "></h1>
                                                            </div>
                                                        ) : (
                                                            <div className="card-image">
                                                                <img
                                                                    className="h-[169px] object-cover w-[100%] rounded-md"
                                                                    src={getImageUrl(
                                                                        item.img
                                                                    )}
                                                                    alt="error"
                                                                />
                                                            </div>
                                                        )}
                                                        <div className="category">
                                                            <h1>
                                                                Rp{" "}
                                                                <span className="text-xl">
                                                                    {item.price}{" "}
                                                                </span>
                                                            </h1>
                                                        </div>
                                                        <div className="px-2">
                                                            {item.name}
                                                        </div>
                                                        <div className="px-2">
                                                            Stok : {item.stok}
                                                        </div>
                                                        {/* <div className="">
                                                        <h1>
                                                            {item.stok}
                                                        </h1>
                                                    </div> */}
                                                    </a>
                                                    <div className="flex">
                                                        <button
                                                            className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <h1>Tidak Ada Produk</h1>
                                    )}
                                </div>
                                <div className="mt-8 mb-5">
                                <TablePagination
                                    rowsPerPageOptions={[8, 16, 24]}
                                    component="div"
                                    count={product.length} 
                                    page={currentPage}
                                    onPageChange={handlePageChange}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={
                                        handleRowsPerPageChange
                                    }
                                />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    {confirmationOpen && (
                        <div className="overflow-hidden">
                        <ConfirmationDialog
                            message="Are you sure you want to delete the product?"
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                            />
                    </div>
                    )}
                    <AddModal
                        addModal={addModal}
                        onClose={handleCloseAddModal}
                    />
                    <EditModal
                        editModal={editModal}
                        product={product}
                        productId={product.find(
                            (product) => product.id === selectedPostId
                        )}
                        onClose={handleCloseEditModal}
                        getImageUrl={getImageUrl}
                    />
                </div>
            </AuthenticatedLayout>
        </>
    );
}

export default AddProduct;
