import { Link } from "react-router-dom";
import { navlinks } from "../mocks/stacticdata";

function NavLinks() {
  return (
    <>
      {navlinks.map((link, index) => {
        return (
          <Link key={index} to={link.href}
            className="flex h-10  hover:bg-sky-100 items-center justify-start rounded-md p-3 font-medium hover:text-blue-500"
          >
            {link.name}
          </Link>
        );
      })}
      <p></p>
    </>
  );
}

export default NavLinks;
