// Date: 29/02/2024
import { redirect } from "next/navigation";
export default function Project() {
  const accessDenied = false;
  if (accessDenied) {
    redirect("/login");
  }
  return (
    <div className="bg-pink-400 w-3/4 h-20 shadow-lg">
      <h1>Project</h1>
    </div>
  );
}
