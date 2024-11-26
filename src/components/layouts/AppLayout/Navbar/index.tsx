import './index.css'

// Hooks
import { useAuth } from '@/context/useAuth';

// Components
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Images
import user from '@/assets/images/user-solid.svg';
import bell from '@/assets/images/bell-solid.svg';

// Constants
const ICON_SIZE = "20px";

const Navbar = () => {
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
    }

    return (
        <header className="relative h-[57px] flex items-center w-full]">
            <nav className="flex fixed w-full h-[57px] left-0 px-5 bg-white z-40">

            {/* Logo */}
            <div className="w-sidebar flex justify-between items-center">
                <p className="font-kanit">Supply Chain</p>
            </div>

            {/* Settings */}
            <ul className='flex-1 gap-8 flex  justify-end items-center '>
                <li>
                    <img src={bell} alt="bell" style={{ width:ICON_SIZE }}/>
                </li>
                <li>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <figure>
                                <img src={user} alt="avatar" style={{ width:ICON_SIZE }} />
                            </figure>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </li>
            </ul>
            </nav>
        </header>
    )
}

export default Navbar