import { useState, useEffect } from "react";
import { ContactModal } from "../components/ContactModal";
import api from "../apis/service";
import type { IContact } from "../models/contact";
import { Alert } from "../components/Alert";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface DecodedToken {
  id: number;
  email: string;
  fullName: string;
  exp: number;
}

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<IContact | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setUserEmail(null);
      }
    }
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.callGetAllContacts();
      if (response.IsSuccess) {
        setContacts(response.data);
      } else {
        setAlert({ type: "error", message: response.message || "Failed to fetch contacts." });
      }
    } catch (error) {
      setAlert({ type: "error", message: "An error occurred while fetching contacts." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const openModal = (contact: IContact | null) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closeModal = (isNeedRefresh: boolean) => {
    setIsModalOpen(false);
    setSelectedContact(null);
    if (isNeedRefresh) {
      fetchContacts();
    }
  };

  const handleLogout = () => {
    Cookies.remove("authToken");
    navigate("/login");
  };

  const confirmDelete = (contact: IContact) => {
    setContactToDelete(contact);
    setIsConfirmingDelete(true);
  };

  const handleDelete = async () => {
    if (!contactToDelete) return;

    try {
      const response = await api.callDeleteContact(contactToDelete.id);
      if (response.IsSuccess) {
        setAlert({ type: "success", message: "Contact deleted successfully!" });
        fetchContacts();
      } else {
        setAlert({ type: "error", message: response.message || "Failed to delete contact." });
      }
    } catch (error) {
      setAlert({ type: "error", message: "An error occurred while deleting the contact." });
    } finally {
      setIsConfirmingDelete(false);
      setContactToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold text-gray-800">ContactBook</div>
            <div className="flex items-center space-x-4">
              {userEmail ? (
                <>
                  <span className="text-gray-700">{userEmail}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <span className="text-gray-700">Loading...</span>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            duration={5000}
          />
        )}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Your Contacts</h1>
          <button
            onClick={() => openModal(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create New
          </button>
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading contacts...</p>
        ) : contacts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => openModal(contact)}
                className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4 cursor-pointer hover:shadow-lg transition-shadow group"
              >
                <img
                  src={contact.profileImage}
                  alt={contact.fullName}
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-medium text-gray-800">{contact.fullName}</h2>
                  <p className="text-sm text-gray-600">{contact.email}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(contact);
                  }}
                  className="hidden group-hover:block px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No contacts found.</p>
        )}
      </main>
      {isModalOpen && (
        <ContactModal
          contact={selectedContact}
          onClose={closeModal}
        />
      )}
      {isConfirmingDelete && (
        <div className="fixed inset-0 bg-[#000000d9] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Confirm Delete</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this contact? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsConfirmingDelete(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}