import React from "react";
import { Head, Link } from "@inertiajs/react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";

function Navbar({ props }) {
    // console.log(props)
    return (
        <>
            <div className="navbar bg-base z-[9999] ">
                <div className="flex-1">
                    <Link
                        href="/"
                        className="btn btn-ghost normal-case text-xl"
                    >
                        E-Warung
                    </Link>
                </div>
                <div className="max-md:hidden"> 
                {props.auth.user ? (
                                <>
                                    {props.auth.user.name === "admin" && (
                                        <>
                                                <Link
                                                    href={route("dashboard")}
                                                    className="btn normal-case btn-md btn-ghost m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                                >
                                                    Dashboard
                                                </Link>
                                        </>
                                    )}

                                        <Link
                                            href="/transaction"
                                            className="btn btn-md normal-case btn-ghost m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Transaction
                                        </Link>
                                        <Link
                                            href="/shop"
                                            className="btn normal-case btn-md btn-ghost m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Shop
                                        </Link>
                                        <Link
                                            method="post"
                                            className="btn normal-case btn-md btn-ghost m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Logout
                                        </Link>
                                </>
                            ) : (
                                <>
                                        <Link
                                            href={route("login")}
                                            className="btn btn-ghost normal-case text-gray-950 hover:text-gray-400   focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route("register")}
                                            className="btn btn-ghost normal-case text-gray-950 hover:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
                                        </Link>
                                </>
                            )}
                </div>

                <div className="flex-none">
                    {props.auth.user ? (
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle"
                            >
                                <div className="indicator">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="badge badge-sm indicator-item text-red-500">
                                        {props.order.length}
                                    </span>
                                </div>
                            </label>
                            <div
                                tabIndex={0}
                                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                            >
                                <div className="card-body">
                                    <span className="font-bold text-lg">
                                        {props.order.length} Items
                                    </span>
                                    <span className="text-info">
                                        Subtotal: Rp{" "}
                                        {props.order.reduce(
                                            (total, item) =>
                                                total + item.total_price,
                                            0
                                        )}
                                    </span>
                                    <div className="card-actions">
                                        <Link
                                            href="/transaction"
                                            className="btn btn-primary btn-block"
                                        >
                                            View cart
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="dropdown dropdown-end md:hidden">
                        <label
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10">
                                <div className="avatar  online placeholder">
                                    <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
                                        <span className="text-xl">ON</span>
                                    </div>
                                </div>
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[9999] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {props.auth.user ? (
                                <>
                                    {props.auth.user.name === "admin" && (
                                        <>
                                            <li>
                                                <Link
                                                    href={route("dashboard")}
                                                    className=" m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                        </>
                                    )}

                                    <li>
                                        <Link
                                            href="/transaction"
                                            className=" m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Transaction
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/shop"
                                            className=" m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Shop
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            method="post"
                                            className=" m-1 text-gray-950 hover:text-gray-900  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                            href={route("logout")}
                                            as="button"
                                        >
                                            Logout
                                        </Link>
                                        {/* <ResponsiveNavLink method="post" href={route('logout')} as="button"
                                    
                                    >
                                Log Out
                            </ResponsiveNavLink> */}
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link
                                            href={route("login")}
                                            className=" text-gray-950 hover:text-gray-400   focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Log in
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            href={route("register")}
                                            className=" text-gray-950 hover:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                        >
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
