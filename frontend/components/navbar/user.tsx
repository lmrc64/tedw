import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
export function User() {
  let gender = sessionStorage.getItem("gender");
  let id = sessionStorage.getItem("id");

  const handleSignOut = () => {
    sessionStorage.clear();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={
              gender ? "/profile/" + gender + ".png" : "/profile/profile.png"
            }
            width={50}
            height={50}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      {id ? (
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <Link href="/profile">My Account</Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      ) : (
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
