import { useState } from "react";
import { Contact, type IContact } from "../models/contact";
import api from "../apis/service";
import { Alert } from "./Alert";

interface ContactModalProps {
  contact: IContact | null;
  onClose: (isNeedRefresh: boolean ) => void;
}

export function ContactModal({ contact, onClose }: ContactModalProps) {
  const [updatedContact, setUpdatedContact] = useState<IContact | null>(contact || new Contact());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof IContact, value: string) => {
    setUpdatedContact((prev) =>
      prev ? new Contact({ ...prev, [field]: value }) : null
    );
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      const uploadResponse = await api.uploadFile([file]);
      setIsUploading(false);

      if (uploadResponse.IsSuccess) {
        return uploadResponse.Data.filePath;
      } else {
        setAlert({ type: "error", message: uploadResponse.Message || "Failed to upload file" });
        return null;
      }
    } catch (error) {
      setIsUploading(false);
      setAlert({ type: "error", message: "An error occurred during file upload" });
      return null;
    }
  };

  const handleSave = async () => {
    let isNeedRefresh = false;
    setIsLoading(true);
    try {
      let imagePath = updatedContact?.image;
      if (selectedFile) {
        const uploadedFilePath = await uploadFile(selectedFile);
        if (!uploadedFilePath) return;
        imagePath = uploadedFilePath;
      }
      if (updatedContact) {
        const contactToSave = new Contact({ ...updatedContact, image: imagePath || "" });
        const response = await api.callUpsertContact(contactToSave);

        if (response.IsSuccess) {
          setAlert({ type: "success", message: "Contact saved successfully" });
          isNeedRefresh = true;
        } else {
          setAlert({ type: "error", message: response.Message || "Failed to save contact" });
        }
      }
    } catch (error) {
      setAlert({ type: "error", message: "An error occurred while saving contact" });
    } finally {
      setTimeout(() => {
        onClose(isNeedRefresh);
      }, 2000);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000d9] flex items-center justify-center z-50">
      {alert && (
          <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={5000}
      />
      )}           
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {contact ? "Edit Contact" : "Create Contact"}
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col items-center relative">
            <label
              htmlFor="imageUpload"
              className="relative cursor-pointer group"
            >
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : updatedContact?.profileImage || "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300 mb-4 object-cover"
              />
              <div className="w-24 h-24 absolute inset-0 bg-[#000000d9] flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-sm font-medium">Choose File</span>
              </div>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={updatedContact?.firstName || ""}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={updatedContact?.lastName || ""}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={updatedContact?.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={updatedContact?.phoneNumber || ""}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={updatedContact?.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={updatedContact?.city || ""}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={updatedContact?.state || ""}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={updatedContact?.zipCode || ""}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={updatedContact?.country || ""}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isUploading || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}