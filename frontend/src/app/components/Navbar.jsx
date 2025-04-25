import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">BookStack</h1>
      <ul className="flex gap-6 text-sm uppercase tracking-wide">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/browse">Browse</Link></li>
        <li><Link href="/community">Community</Link></li>
        <li><Link href="/profile">Profile</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;
