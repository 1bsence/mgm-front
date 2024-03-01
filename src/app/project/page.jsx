// Date: 29/02/2024
import { redirect } from "next/navigation";
export default function Project() {
  if (typeof window !== "undefined") {
    var email = localStorage.getItem("userEmail");
    if (email == "" || email == null) {
      redirect("/login");
    }
  }
  return (
    <div className="bg-pink-400 w-3/4 h-20 shadow-lg">
      <h1> Secret page: Project</h1>
    </div>
  );
}
