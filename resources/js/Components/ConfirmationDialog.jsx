import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <>
            <AnimatePresence>
                <motion.div className="">
                    <motion.div
                        className="modall h-[100rem] modal-bg"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                    >
                        <motion.div className="modal-content">
                            
                            
                            <motion.h1>
                                {message}
                            </motion.h1>
                            <div className="flex justify-end mt-3">

                            <motion.button
                                className="border border-gray-700 bg-gray-700 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                                onClick={onConfirm}
                                >
                                Confirm
                            </motion.button>
                            <motion.button
                                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
                                onClick={onCancel}
                                >
                                Cancel
                            </motion.button>
                                </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default ConfirmationDialog;
