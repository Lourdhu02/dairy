import { NavLink } from 'react-router-dom';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';
import { CiLogout } from 'react-icons/ci';
import { VscGistSecret } from 'react-icons/vsc';
import { MdAttachMoney } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { LuGalleryHorizontalEnd } from 'react-icons/lu';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar-component">
      <div className="navbar-container">
        <div className="profile-pic"><RiAccountCircleFill /></div>
        <div className="account-info">Welcome, Mr.Mikey</div>
        <div className="nav-links">
        <NavLink to="/home" className="links" activeClassName="active-link"><MdOutlineAccountCircle />Home</NavLink>
          <NavLink to="/memories" className="links" activeClassName="active-link"><LuGalleryHorizontalEnd />Memories</NavLink>
          <NavLink to="/favorites" className="links" activeClassName="active-link"><MdOutlineFavoriteBorder />Favorites</NavLink>
          <NavLink to="/personal" className="links" activeClassName="active-link"><VscGistSecret />Personal</NavLink>
          <NavLink to="/expense" className="links" activeClassName="active-link"><MdAttachMoney />Expense Tracking</NavLink>
          <NavLink to="/password" className="links" activeClassName="active-link"><RiLockPasswordLine />Password Manager</NavLink>
        </div>
        <div className="accounts"><MdOutlineAccountCircle />Account</div>
        <div className="log-out"><CiLogout />Logout</div>
      </div>
    </div>
  );
};

export default Navbar;
