import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addProject = async ({ title, category, time, location, description, thumbnail, images }) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      title,
      category,
      time,
      location,
      description,
      thumbnail,
      images,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ Error adding project:", error);
    return { success: false, error };
  }
};
