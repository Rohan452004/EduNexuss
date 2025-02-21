import { useState } from "react";

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onDelete,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-red-600">Confirm Deletion</h2>
        <p className="mt-2 text-gray-700">
          Are you sure you want to delete your account ? This action cannot be
          undone!
        </p>
        <div className="mt-4 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
