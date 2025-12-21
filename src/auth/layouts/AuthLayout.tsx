import { Outlet } from "react-router"

export const AuthLayout = () => {
    return (
        <div>
            <header>AuthLayout</header>
            <Outlet />
        </div>
    )
}

export default AuthLayout;