import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="fixed bg-white p-3 z-10 top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-black text-lg">
          <Image
            src={"/images/logo_1 1.png"}
            alt="DevFusion Logo"
            width={147}
            height={41}
          />
        </Link>
        <nav className="flex space-x-4">
          <Link href={"/"} className="group relative">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
              Головна
            </span>
          </Link>
          <Link href={"/"} className="group relative">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
              Вакансії
            </span>
          </Link>
          <Link href={"/"} className="group relative">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 group-hover:after:w-full">
              Профіль
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
