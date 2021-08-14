import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, NewspaperIcon, XIcon } from '@heroicons/react/outline';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/client';
import Link from 'next/link';
import React, { Fragment, useEffect, useState } from 'react';

const navigation = [
  { name: 'Mijn formulieren', href: '/cards', protected: true },
  { name: 'Nieuw formulier', href: 'card/new', protected: false },
];

interface Props {
  session: Session | null
}

const Navigation = ({ session }: Props) => {
  const [navigationItems, setNavigationItems] = useState(navigation);

  useEffect(() => {
    if (!session) {
      const filteredItems = navigationItems.filter((item) => !item.protected);
      setNavigationItems(filteredItems);
    }
  }, [session]);
  return (
    <Popover>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link href="/">
                <a>
                  <span className="sr-only">Workflow</span>
                  <NewspaperIcon className="text-green-600 h-8 w-8" />
                </a>
              </Link>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
            {navigationItems.map((item) => (
              <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            ))}
            {!session && (

            <button
              type="button"
              onClick={() => signIn()}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Login
            </button>
            )}
            {session && (
            <button
              type="button"
              onClick={() => signOut()}
              className="font-medium text-green-600 hover:text-green-500"
            >
              Uitloggen
            </button>
            )}
            {/* { session?.user.image && (
                    <div className="ml-3">

                      <Image
                        className="rounded-full"
                        src={session.user.image}
                        alt="profile picture"
                        width={30}
                        height={30}
                      />
                    </div>
                  )} */}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div className="flex items-center">
                <NewspaperIcon className="text-green-600 h-8 w-8 mr-3" />
                {session && (
                  <>
                    Hoi
                    {' '}
                    {session?.user.name}
                  </>
                )}
              </div>
              <div className="-mr-2">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
            {!session && (
            <button
              type="button"
              onClick={() => signIn()}
              className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
            >
              Inloggen
            </button>
            )}
            {session && (
            <button
              type="button"
              onClick={() => signOut()}
              className="block w-full px-5 py-3 text-center font-medium text-green-600 bg-gray-50 hover:bg-gray-100"
            >
              Uitloggen
            </button>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Navigation;
