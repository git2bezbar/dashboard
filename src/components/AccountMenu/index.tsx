'use client';
import { disconnect } from "@/services/api/auth";
import useStore from "@/store/userInfoStore";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

export interface AccountMenuProps { deleteCookies: () => void }

export default function AccountMenu({ deleteCookies }: AccountMenuProps) {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  useEffect(() => {
    const closeMenuOnPseudoBlur = (event: MouseEvent) => {
      if (dropdownRef.current 
        && (!dropdownRef.current.contains(event.target as Node)) 
        && !dropdownMenuRef?.current?.contains(event.target as Node)) {
        setIsMenuOpened(false);
      }
    }
    document.addEventListener('mousedown', closeMenuOnPseudoBlur);

    return () => {
      document.removeEventListener('mousedown', closeMenuOnPseudoBlur);
    };
  }, [dropdownRef]);

  const userInfo = useStore(state => state.userInfo);

  const logoutMethod = async () => {
    await disconnect();
    await deleteCookies();
    router.push("/login");
  };

  return (
    <div
      ref={dropdownRef}
      className="rounded-ui flex items-center px-4 py-3 bg-primary gap-6 relative duration-200 hover:cursor-pointer hover:bg-primaryDark"
      onClick={() => {setIsMenuOpened(!isMenuOpened)}}
    >
      <img
        className="rounded-full ring-2 ring-white/30"
        src="profile_picture.jpg"
        alt="AD Schwarzer"
        height={32}
        width={32}
      />
      <div className="flex flex-col items-start text-white">
        <p className="font-bold">{ userInfo.firstname ? userInfo.firstname : userInfo.username } { userInfo.lastname && userInfo.lastname }</p>
        { userInfo.firstname && (
          <p className="text-xs">{ userInfo.username }</p>
        ) }
      </div>
      <svg
        className={`duration-300 ${isMenuOpened ? "rotate-180" : ""}`}
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
      >
        <g transform="translate(6.000000, 7.000000)" fill="#FFF"  fillRule="nonzero">
          <path d="M4.869,9.63078422 C4.811,9.57428154 4.563,9.36093522 4.359,9.16220166 C3.076,7.99707745 0.976,4.95762299 0.335,3.36678032 C0.232,3.12518266 0.014,2.51436922 0,2.18801754 C0,1.87530443 0.072,1.57720409 0.218,1.29274233 C0.422,0.938139308 0.743,0.653677545 1.122,0.497808086 C1.385,0.397467121 2.172,0.241597662 2.186,0.241597662 C3.047,0.0857282026 4.446,0 5.992,0 C7.465,0 8.807,0.0857282026 9.681,0.213346322 C9.695,0.227959084 10.673,0.383828544 11.008,0.554310765 C11.62,0.867023868 12,1.47783731 12,2.13151486 L12,2.18801754 C11.985,2.613736 11.605,3.5090112 11.591,3.5090112 C10.949,5.01412567 8.952,7.98343887 7.625,9.17681442 C7.625,9.17681442 7.284,9.51290794 7.071,9.65903556 C6.765,9.88699464 6.386,10 6.007,10 C5.584,10 5.19,9.87238188 4.869,9.63078422"></path>
        </g>
      </svg>
      {
        isMenuOpened && (
          <ul ref={dropdownMenuRef} className={`absolute bg-white bottom-0 left-0 right-0 flex flex-col translate-y-[110%] border-2 border-black/20 rounded-ui`}>
            <li className="duration-300 hover:bg-whiteDark">
              <Link className="flex items-center gap-4 px-4 py-3" href="/account">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.00008 10.1159C10.8925 10.1159 13.3334 10.5859 13.3334 12.3993C13.3334 14.2133 10.8765 14.6666 8.00008 14.6666C5.10833 14.6666 2.66675 14.1966 2.66675 12.3833C2.66675 10.5693 5.12367 10.1159 8.00008 10.1159ZM8.00008 1.33331C9.95948 1.33331 11.5294 2.90266 11.5294 4.86068C11.5294 6.8187 9.95948 8.38872 8.00008 8.38872C6.04135 8.38872 4.47076 6.8187 4.47076 4.86068C4.47076 2.90266 6.04135 1.33331 8.00008 1.33331Z" fill="#131313"/>
                </svg>
                Mon compte
              </Link>
            </li>
            <li className="duration-300 hover:bg-whiteDark hover:cursor-pointer" onClick={logoutMethod}>
              <div className="flex items-center gap-4 px-4 py-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.66174 1.33331C9.31678 1.33331 10.6666 2.65998 10.6666 4.29331V7.48665H6.59682C6.30515 7.48665 6.07453 7.71331 6.07453 7.99998C6.07453 8.27998 6.30515 8.51331 6.59682 8.51331H10.6666V11.7C10.6666 13.3333 9.31678 14.6666 7.64817 14.6666H4.34488C2.68306 14.6666 1.33325 13.34 1.33325 11.7066V4.29998C1.33325 2.65998 2.68984 1.33331 4.35166 1.33331H7.66174ZM12.3601 5.70011C12.5601 5.49345 12.8867 5.49345 13.0867 5.69345L15.0334 7.63345C15.1334 7.73345 15.1867 7.86011 15.1867 8.00011C15.1867 8.13345 15.1334 8.26678 15.0334 8.36011L13.0867 10.3001C12.9867 10.4001 12.8534 10.4534 12.7267 10.4534C12.5934 10.4534 12.4601 10.4001 12.3601 10.3001C12.1601 10.1001 12.1601 9.77345 12.3601 9.57345L13.4267 8.51345L10.6666 8.51331V7.48665L13.4267 7.48678L12.3601 6.42678C12.1601 6.22678 12.1601 5.90011 12.3601 5.70011Z" fill="#131313"/>
                </svg>
                Déconnexion
              </div>
            </li>
          </ul>
        )
      }
    </div>
  )
}
