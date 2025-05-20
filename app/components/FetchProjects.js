"use client"
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
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
      // Step 1: Get the Firestore document
      const docRef = doc(db, "Projects", id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("Document does not exist.");
        return;
      }

      const project = docSnap.data();
      const publicIdsToDelete = [];

      // Step 2: Add thumbnail public_id
      if (project.thumbnail?.public_id) {
        publicIdsToDelete.push(project.thumbnail.public_id);
      }

      // Step 3: Add all image public_ids
      if (Array.isArray(project.images)) {
        project.images.forEach((img) => {
          if (img.public_id) publicIdsToDelete.push(img.public_id);
        });
      }

      // Step 4: Call API to delete images from Cloudinary
      const res = await fetch("/api/delete-project-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicIds: publicIdsToDelete }),
      });

      const result = await res.json();
      if (!result.success) {
        console.error("Image deletion failed:", result.error);
        alert("Failed to delete images from Cloudinary.");
        return;
      }

      // Step 5: Delete the document from Firestore
      await deleteDoc(docRef);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      alert("Project and all images deleted successfully!");
    } catch (error) {
      console.error("Error deleting document and images:", error);
      alert("Failed to delete project.");
    }
  };

  if (loading) return <div className="flex justify-center items-center"><p className="h-[80vh] flex justify-center items-center">Loading...</p></div>;

  return (
    <div>
      <table className="border-separate border-spacing-y-6 mx-4">
        <thead>
          <tr className="sticky top-16 bg-[#051f21]">
            <th className="py-4 w-[20%]">Thumbnail</th>
            <th className="py-4 w-[20%]">Title</th>
            <th className="py-4 w-[5%]">Category</th>
            <th className="py-4 w-[15%]">Handover Date</th>
            <th className="py-4 w-[15%]">Location</th>
            <th className="py-4 w-[25%]">Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="row rounded-[2rem] my-8 h-fit">
              <td className="rounded-l-[1rem]"><div className="py-0 my-2 justify-center items-center flex"><img src={item.thumbnail?.url} alt="" className="w-full h-auto rounded-xl"/></div></td>
              <td><div className="py-0 my-2 justify-center items-center flex">{item.title}</div></td>
              <td><div className="py-0 my-2 justify-center items-center flex">{item.category}</div></td>
              <td><div className="py-0 my-2 justify-center items-center flex">{new Date(`${item.time}-01`).toLocaleString("default", { month: "short", year: "numeric" })}</div></td>
              <td><div className="py-0 my-2 justify-center items-center flex">{item.location}</div></td>
              <td><div className="py-0 my-2 justify-center items-center flex">{item.description.length > 150 ? `${item.description.substring(0, 150)}...` : item.description}</div></td>
              <td className="rounded-r-[1rem]">
                <div className="flex justify-center items-center text-xl mx-3 my-2">
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
