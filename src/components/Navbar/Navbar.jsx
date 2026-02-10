import NavbarLogo from "./NavbarLogo";
import LinkItem from "../ui/LinkItem";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="w-full flex items-center py-7.5 px-35 bg-[#FFFFFF33]">
        <NavbarLogo />
        <div className="nav-links flex items-center gap-10 mr-auto">
          <LinkItem to={"/"}>home</LinkItem>
          <LinkItem to={"books"}>books</LinkItem>
          <LinkItem to={"about"}>about us</LinkItem>
        </div>
        <div className="nav-btns flex items-center gap-3">
          <Link to="/login">
            <Button width={"fit"} isMainBtn={true}>
              login
            </Button>
          </Link>
          <Link to="/signup">
            <Button width={"fit"} isMainBtn={false}>
              sign up
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
