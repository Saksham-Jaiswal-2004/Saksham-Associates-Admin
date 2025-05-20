// firebase/addTestimonial.js
import { db } from "./firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const addTestimonial = async (name, rating, role, testimonial, imageUrl, publicId) => {
  try {
    const docRef = await addDoc(collection(db, "Testimonials"), {
      name,
      rating,
      role,
      testimonial,
      imageUrl,
      publicId,
      createdAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding testimonial: ", error);
    return { success: false, error };
  }
};
