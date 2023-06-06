"use client";
import { Fragment, useState, FC, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  FireIcon,
  TableCellsIcon,
  UsersIcon,
  CalendarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import GroLogo from "@/components/icons/Logo";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Foods",
    href: "/dashboard/foods",
    icon: FireIcon,
    current: false,
  },
  {
    name: "Plans",
    href: "/dashboard/plans",
    icon: TableCellsIcon,
    current: false,
  },
  {
    name: "My Plans",
    href: "/dashboard/my-plans",
    icon: TableCellsIcon,
    current: false,
  },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Schedule",
    href: "/dashboard/schedule",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
];

const clientNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  { name: "My plans", href: "/my-plans", icon: TableCellsIcon, current: true },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon, current: true },
];

export interface IDashboardLayout {
  children: React.ReactNode;
}

const DashboardLayout: FC<IDashboardLayout> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileName, setProfileName] = useState<string>("");
  const router = useRouter();
  const path = usePathname();

  const getUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error);
      return null;
    }
    console.log("user", user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      return null;
    }
    router.refresh();
  };
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex flex-shrink-0 items-center p-0 md:px-4 pt-4">
                      <div className="bg-[#F695A0] w-16 rounded-md">
                        <GroLogo />
                      </div>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  onClick={() => setSidebarOpen(false)} // Add this line
                                  className={clsx(
                                    item.href === path
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                  )}
                                >
                                  <item.icon
                                    className={clsx(
                                      item.href === path
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0",
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pt-6">
            <div className="w-16 mx-auto bg-[#F695A0] rounded-md">
              <GroLogo />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={clsx(
                            item.href === path
                              ? "bg-gray-50 text-indigo-600"
                              : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                          )}
                        >
                          <item.icon
                            className={clsx(
                              item.href === path
                                ? "text-indigo-600"
                                : "text-gray-400 group-hover:text-indigo-600",
                              "h-6 w-6 shrink-0",
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{profileName}</span>
                    <button
                      className="p-2 bg-red-500 text-white rounded-lg"
                      onClick={signOut}
                    >
                      Sign out
                    </button>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-30 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
        </div>

        <main className="py-10 lg:pl-72 h-screen">
          <div className="px-4 sm:px-6 lg:px-8 h-full">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
