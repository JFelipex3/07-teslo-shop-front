import { Outlet } from "react-router"

export const AdminLayout = () => {
    return (
        <div>
            <header>AdminLayout</header>
            <Outlet />
        </div>
    )
}

export default AdminLayout;
