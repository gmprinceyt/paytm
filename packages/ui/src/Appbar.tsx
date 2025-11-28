import { Button } from "./button";
import "./global.css"
interface AppbarProps {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } | null;
  onSignin:  () => void;
  onSignout:  () => void;
}

export function Appbar({ onSignin, onSignout, user }: AppbarProps) {
  return (
    <nav className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </nav>
  );
}
