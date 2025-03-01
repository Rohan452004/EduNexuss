import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { deleteProfile } from "../../../../services/operations/SettingsAPI.js";
import DeleteAccountModal from "../Settings/DeleteAccountModal.jsx"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDeleteAccount() {
    
    try {
      dispatch(deleteProfile(token, navigate));
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    } finally {
      setIsModalOpen(false);
    }
  
  }

  return (
    <>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-3xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="md:w-3/5 text-pink-25">
            <p>Would you like to delete account?</p>
            <p>
              Deleting your account is permanent and will remove all the contain associated with it.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
          >
            Delete My Account
          </button>

          {/* Confirmation Modal */}
          <DeleteAccountModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDeleteAccount}
          />
        </div>
      </div>
    </>
  );
}
