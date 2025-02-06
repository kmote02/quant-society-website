import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-black p-4 text-foreground">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link href="/">
            <a className="hover:text-primary">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a className="hover:text-primary">About</a>
          </Link>
        </li>
        <li>
          <Link href="/events">
            <a className="hover:text-primary">Events</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a className="hover:text-primary">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
