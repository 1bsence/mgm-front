import logoimg from "@/public/logo-black-removebg-preview.png";
import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="h-screen w-40 bg-pink-400 flex flex-col">
      {/* verrtical navbar for Projects, Departments and Employee */}
      <div className="flex justify-start p-2">
        <Image src={logoimg} alt="logo" width={50} height={50} />
      </div>
      <div className="flex flex-col space-y-5 p-4">
        <a href="#">Projects</a>
        <a href="#">Departments</a>
        <a href="#">Employees</a>
      </div>
    </nav>
  );
}
