import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="py-4 px-8">
      <ul className="flex gap-5">
        <li>
          <Link href={'/'} className="underline">
            Cache and pagination
          </Link>
        </li>
        <li>
          <Link href={'/cursor'} className="underline">
            Cursor based
          </Link>
        </li>
        <li>
          <Link href={'/cursor-suspense'} className="underline">
            Cursor based - SUSPENSE
          </Link>
        </li>
      </ul>
    </nav>
  );
};
