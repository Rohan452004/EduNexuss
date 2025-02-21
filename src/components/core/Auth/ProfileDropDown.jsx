import { useEffect, useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";

export default function ProfileDropdown({ closeNavbar }) {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  // ✅ Auto-open in mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <button
      className="relative"
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
    >
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          className={`absolute top-[118%] z-[1000] divide-y-[1px] divide-richblack-700 
             overflow-hidden rounded-md border-[1px] border-richblack-700 
             bg-richblack-800 w-[200px]
             left-1/2 transform -translate-x-1/2 
             md:left-0 md:translate-x-0 md:right-auto`}
        >
          {/* Close Navbar on Dashboard Click */}
          <Link
            to="/dashboard/my-profile"
            onClick={() => {
              setOpen(false);
              closeNavbar && closeNavbar(); // Safe call
            }}
          >
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          {/* Close Navbar on Logout */}
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
              closeNavbar && closeNavbar(); // Safe call
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
}
