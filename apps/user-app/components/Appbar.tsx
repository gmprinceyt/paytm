import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../app/lib/auth";

async function getSesstion() {
  const session = await getServerSession(authOptions);
  return session?.user || null;
}

export  async function Appbar() {
  const user = await getSesstion();

  if (!user) {
    redirect("/api/auth/signin");
  }
  return (
    <header className="max-w-7xl h-20 mx-auto px-4">
      <nav className=" max-w-6xl  backdrop-blur-2xl bg-amber-200  flex items-center justify-between p-4 rounded-full m-auto ">
        {/* Brand Name */}
        <div className="">
          <span>Paytm</span>
        </div>

        {/* Buttons */}
        <div className="">
          {
            user? <div>{user.name}</div>: <button>Signin</button>
          }
        </div>
      </nav>
    </header>
  );
}
