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
    <div>
      <table>
        <thead>
          <tr className="sticky top-[18.4%] bg-[#051f21]">
            <th className="py-4 w-[10%]">Created On</th>
            <th className="py-4 w-[20%]">Name</th>
            <th className="py-4 w-[5%]">Rating</th>
            <th className="py-4 w-[20%]">Role</th>
            <th className="py-4 w-[45%]">Testimonial</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="row h-fit">
              <td><div className="justify-center items-center flex h-fit py-4">
                {item.createdAt?.toDate().toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Kolkata"
                })}</div></td>
              <td><div className="justify-center items-center flex h-fit py-4">{item.name}</div></td>
              <td><div className="justify-center items-center flex h-fit py-4">{item.rating}⭐</div></td>
              <td><div className="justify-center items-center flex h-fit py-4">{item.role}</div></td>
              <td><div className="justify-center items-center flex h-fit py-4">{item.testimonial}</div></td>
              <td>
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

export default FetchTestimonials;
