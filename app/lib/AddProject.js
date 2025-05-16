import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addProject = async (title, category, time, location, description) => {
  try {
    const docRef = await addDoc(collection(db, "Projects"), {
      title,
      category,
      time,
      location,
      description,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding testimonial: ", error);
    return { success: false, error };
  }
};
