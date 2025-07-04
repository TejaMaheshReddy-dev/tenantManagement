import React, { useState } from "react";
import { useAuth } from "@/contexts/auth-context";

function useProfileHook() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  const handleSave = () => {
    // In a real app, you would update the user data via API
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };
  return { user, formData, setFormData, isEditing, handleSave, setIsEditing };
}

export default useProfileHook;
