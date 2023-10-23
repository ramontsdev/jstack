// import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../app/hooks/use-auth";
import { DropdownMenu } from "./dropdown-menu";

export function UserMenu() {
  const { signOut, user } = useAuth()
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div className="bg-teal-0 rounded-full w-12 h-12 flex items-center justify-center border border-teal-200">
          <span className="text=sm tracking-[-0.5px] text-teal-900 font-medium">
            {user?.name.slice(0, 2).toLocaleUpperCase()}
          </span>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-32">
        <DropdownMenu.Item
          className="flex items-center justify-between"
          onSelect={signOut}
        >
          Sair
          <ExitIcon className='w-4 h-4' />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
