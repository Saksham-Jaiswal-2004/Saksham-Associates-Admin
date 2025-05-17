"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

const FetchProjects = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Projects"));
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
      await deleteDoc(doc(db, "Projects", id));
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Data deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("Failed to delete data.");
    }
  };

  if (loading) return <div className="flex justify-center items-center"><p className="h-[80vh] flex justify-center items-center">Loading...</p></div>;

  return (
    <div>
      <table>
        <thead>
          <tr className="sticky top-16 bg-[#051f21]">
            <th className="py-4 w-[20%]">Title</th>
            <th className="py-4 w-[10%]">Category</th>
            <th className="py-4 w-[20%]">Handover Date</th>
            <th className="py-4 w-[20%]">Location</th>
            <th className="py-4 w-[50%]">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="row">
              <td><div className="justify-center items-center flex">{item.title}</div></td>
              <td><div className="justify-center items-center flex">{item.category}</div></td>
              <td><div className="justify-center items-center flex">{new Date(`${item.time}-01`).toLocaleString("default", { month: "short", year: "numeric" })}</div></td>
              <td><div className="justify-center items-center flex">{item.location}</div></td>
              <td><div className="justify-center items-center flex">{item.description.length > 150 ? `${item.description.substring(0, 150)}...` : item.description}</div></td>
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

export default FetchProjects
