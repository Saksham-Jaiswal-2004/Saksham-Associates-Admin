"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

const FetchTestimonials = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Testimonials"));
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
      await deleteDoc(doc(db, "Testimonials", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete data.");
    }
  };

  if (loading) return <div className="flex justify-center items-center"><p>Loading...</p></div>;

  return (
    <div className="p-2">
        <table className="my-10">
            <thead>
                <tr>
                    <th className="w-[22%]">Name</th>
                    <th className="w-[8%]">Rating</th>
                    <th className="w-[20%]">Role</th>
                    <th className="w-[50%]">Testimonial</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.Name}</td>
                        <td>{item.Rating} Stars</td>
                        <td>{item.Role}</td>
                        <td>{item.Description}</td>
                        <td className="flex text-xl justify-center items-center mx-3 my-6">
                          <MdDelete className="text-xl link" onClick={() => handleDelete(item.id)}/>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default FetchTestimonials;
