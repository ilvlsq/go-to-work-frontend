import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed bg-white border-b p-4 z-10 top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-black text-lg">
          DevFusion
        </Link>
        <button className="button bg-white p-2 rounded-md border border-current transition duration-300 hover:bg-slate-200">
          Create
        </button>
      </div>
    </header>
  );
}
