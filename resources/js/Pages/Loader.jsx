import React from "react";

function Loader() {
    return (
        <>
            <div className="fixed modal-bg h-screen w-screen z-[9999]">
                <div className="flex justify-center items-center justify-items-center w-screen h-screen">
                    <span className="text-white loading loading-dots loading-lg"></span>
                </div>
            </div>
        </>
    );
}

export default Loader;
