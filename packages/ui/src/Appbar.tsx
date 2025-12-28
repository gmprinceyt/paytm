import "./global.css"

export function Appbar({ onSignin, onSignout, user }: AppbarProps) {
  return (
    <nav className="flex justify-between w-full">
      <div className="text-xl font-extrabold">Pay<span className="text-blue-500  ">TM</span></div>
      <div className="flex gap-2 items-center ">
          <img
            src={user?.image || "/profile.png"}
            height={35}
            width={35}
            className="rounded-full bg-gray-200 "
          />
          <span className="font-bold text-lg ">{user?.name}</span>

          {/* Add if user click on profile icon logout button change profile button   */}
        {/* <Button onClick={user ? onSignout : onSignin}>
          {user ? user.name : "Login"}
        </Button> */}
      </div>
    </nav>
  );
}

interface AppbarProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
  onSignin:  () => void;
  onSignout:  () => void;
}