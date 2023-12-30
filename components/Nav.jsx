'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = session?.user;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setAuthProviders = async () => {
        const response = await getProviders();

        setProviders(response);
    }

    setAuthProviders();
  }, []);

  const signInButtons = providers && 
    Object.values(providers).map(provider => (
        <button
            type='button'
            key={provider.name}
            onClick={() => signIn(provider.id)}
            className='black_btn'
        >
            Sign In
        </button>
    ));

  const getProfileImage = (callback) => (
    <Image
        className="rounded-full"
        src={session?.user.image}
        alt='Profile image'
        width={37}
        height={37}
        onClick={callback}
    />
  );

  return (
    <nav className="flex-between mb-4 pt-3 w-full">
        <Link href='/' className="flex gap-2 flex-xenter">
            <Image
                className="object-contain"
                src='assets/images/logo.svg'
                alt='Logo for Be better'
                width={30}
                height={30}
            />
            <p className="logo_text">Be better</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex hidden">
            {isUserLoggedIn ? (
                <div className="flex gap-3 md:gap-5">
                    <Link
                        className="black_btn"
                        href='/create-goal'
                    >
                        Add goal
                    </Link>

                    <button type='button' onClick={signOut} className='outline_btn'>
                        Sign Out
                    </button>

                    <Link href='/profile'>
                        {getProfileImage()}
                    </Link>
                </div>
            ) : signInButtons}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex relative">
            {isUserLoggedIn ? (
                <div className="flex">
                    {getProfileImage(() => setToggleDropdown((prevState) => !prevState))}

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href='/profile'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                My profile
                            </Link>
                            <Link
                                href='/create-goal'
                                className='dropdown_link'
                                onClick={() => setToggleDropdown(false)}
                            >
                                Add Goal
                            </Link>
                            <button
                                type='button'
                                onClick={() => {
                                    setToggleDropdown(false);
                                    signOut();
                                }}
                                className='mt-5 w-full black_btn'
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : signInButtons}
        </div>
    </nav>
  )
}

export default Nav