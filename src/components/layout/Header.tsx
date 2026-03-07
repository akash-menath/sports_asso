import { Bars3Icon, MagnifyingGlassIcon, BellIcon, PlusIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';

export default function Header() {
  return (
    <header className="bg-[#f9f9f9] border-b border-[#f0f0f0] px-6 py-3 shrink-0">
      <div className="flex justify-between items-center w-full">
        {/* Left side: Menu and Logo */}
        <div className="flex items-center gap-4">
          <button className="text-[#555] hover:text-[#333] focus:outline-none rounded-sm p-1 transition-colors">
            <span className="sr-only">Open menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="text-[18px] font-bold text-[#555] tracking-tight">
            KSA Logo
          </span>
        </div>

        {/* Right side items */}
        <div className="flex items-center gap-5">
          <button className="text-[#666] hover:text-[#333] transition-colors focus:outline-none">
            <MagnifyingGlassIcon className="h-5 w-5 stroke-2" />
          </button>

          <button className="text-[#666] hover:text-[#333] transition-colors relative focus:outline-none">
            <BellIcon className="h-5 w-5 stroke-2" />
          </button>

          <button className="text-[#666] hover:text-[#333] transition-colors focus:outline-none">
            <PlusIcon className="h-6 w-6 stroke-2" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-3 ml-2 cursor-pointer group">
            <div className="h-9 w-9 rounded-full bg-[#f3eefe] flex items-center justify-center transition-colors group-hover:bg-[#ebe2fe]">
              <UserIcon className="h-5 w-5 text-[#8b5cf6]" />
            </div>

            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#444] leading-tight group-hover:text-[#333]">Anil A Johnson</span>
              <span className="text-[11px] text-[#888] font-medium leading-tight mt-[2px]">Secretary</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
