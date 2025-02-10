"use client"; 

import Navbar from "@/components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export default function Distributors() {
  const { } = useAuth();
  return (
    <div>
        <Navbar />
        <div className="mx-12 my-4">
            <table className="w-full border-collapse border border-gray-400 my-4">
                <thead>
                    <tr>
                    <th className="border border-gray-300 ">Distributor Name</th>              
                    <th className="border border-gray-300 ">City</th>
                    <th className="border border-gray-300 ">Action</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td className="border border-gray-300 ">Beans R Us</td>              
                        <td className="border border-gray-300 ">Chicago</td>
                        <td className="border border-gray-300 "><Link href={"/distributors/edit"} className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Edit</Link></td>
                    </tr>                    
                </tbody>
            </table>
            <Link href={"/distributors/add"} className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded">Add Distributor</Link>
        </div>        
    </div>
  );
}
