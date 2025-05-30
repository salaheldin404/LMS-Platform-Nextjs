import Navbar from "./Navbar";

import { getActiveSession } from "@/server/actions/auth";
const Header = async () => {
  let session = null;

  try {
    session = await getActiveSession();
    // console.log('session from header',session)
  } catch (error) {
    console.error(error, "error from get session");
  }

  return (
    <header className="lg:shadow z-20 fixed top-0 left-0 w-full h-140px ">
      <Navbar session={session} />
    </header>
  );
};

export default Header;
