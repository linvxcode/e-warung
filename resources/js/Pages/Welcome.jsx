import { Link, Head } from "@inertiajs/react";
import Landing_Page from "./Landing_Page";
import Navbar from "@/Components/Navbar";

export default function Welcome(props) {
    console.log(props)
    return (
        <>
            <Head title="Welcome" />
            <div className="absolute flex w-[100%]">

            <Navbar orderId={props.order} props={props}  />
            </div>

            <div className="relative sm:flex sm:justify-center sm:items-center bg-center bg-white text-black selection:text-white">

                <Landing_Page props={props.auth} />
            </div>
        </>
    );
}
