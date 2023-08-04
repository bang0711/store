import Link from "next/link";
import NavbarLinks from "./NavbarLinks";
type Props = {
  user: any;
};
async function Navbar({ user }: Props) {
  const number = (user?.currentOrder?.products.length as number) - 1;
  return (
    <header className="sticky top-0 shadow-md p-3 backdrop-blur-md bg-white/50 z-50">
      <nav className="flex items-center justify-between gap-3">
        <Link href={"/"} className="px-3 py-1 rounded-lg shadow-md">
          Home
        </Link>
        <NavbarLinks number={number} user={user} />
      </nav>
    </header>
  );
}

export default Navbar;
