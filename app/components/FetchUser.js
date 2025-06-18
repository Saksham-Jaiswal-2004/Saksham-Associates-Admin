"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const FetchUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!id || typeof id !== "string") {
      console.error("Invalid ID format:", id);
      alert("Error: Invalid document ID");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Queries", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete data.");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-[80vh]"><p className="loader text-[20rem]"></p></div>;

  return (
    <div>
      <table className="border-separate border-spacing-y-6 mx-4">
        <thead>
          <tr className="sticky top-16 bg-[#051f21]">
            <th className="w-[15%] py-4">Registered On</th>
            <th className="w-[25%] py-4">Name</th>
            <th className="w-[25%] py-4">Email</th>
            <th className="w-[15%] py-4">Phone</th>
            <th className="w-[20%] py-4">Password</th>
            <th className="w-[20%] py-4">Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="row rounded-[2rem] my-8">
              <td className="rounded-l-[1rem]"><div className="justify-center items-center flex my-6">
                {item.CreatedOn?.toDate().toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Kolkata"
                })}</div></td>
              <td><div className="justify-center items-center flex my-6">{item.Name}</div></td>
              <td><div className="justify-center items-center flex my-6">{item.Email}</div></td>
              <td><div className="justify-center items-center flex my-6">+{parsePhoneNumberFromString(item.Phone).countryCallingCode}-{parsePhoneNumberFromString(item.Phone).nationalNumber}</div></td>
              <td><div className="justify-center items-center flex my-6">{item.Password}</div></td>
              <td><div className="justify-center items-center flex my-6">{item.admin? "Admin" : "User"}</div></td>
              <td className="rounded-r-[1rem]">
                <div className="flex justify-center items-center text-xl mx-3 my-6">
                  <MdDelete className="text-xl link hover:text-red-600" onClick={() => handleDelete(item.id)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchUser;