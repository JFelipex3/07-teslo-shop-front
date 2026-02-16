import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"
import { currencyFormatter } from '../../../lib/currency-formatter';

export const AdminProductsPage = () => {

    const { data, isLoading } = useProducts();

    if ( isLoading ) return <CustomFullScreenLoading />;

    const products = data?.products || [];

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Productos" subtitle="Administración de productos" />
                <div className="flex justify-end mb-10 gap-4">
                    <Link to="/admin/products/new">
                        <Button>
                            <PlusIcon /> Agregar Producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { products.map( (producto) => (
                        <TableRow key={producto.id}>
                            <TableCell><img src={ producto.images[0] } alt={ producto.title } className="w-20 h-20 object-cover rounded-md"/></TableCell>
                            <TableCell>
                                <Link to={`/admin/products/${ producto.id }`} className="hover:text-blue-500 underline">
                                    { producto.title }
                                </Link>
                            </TableCell>
                            <TableCell>{ currencyFormatter(producto.price) }</TableCell>
                            <TableCell>{ producto.tags.join(", ") }</TableCell>
                            <TableCell>{ producto.stock }</TableCell>
                            <TableCell>{ producto.sizes.join(", ") }</TableCell>
                            <TableCell className="text-right">
                                <Link to={`/admin/products/${ producto.id }` } >
                                    <PencilIcon className="w-4 h-4 text-blue-500"/>
                                </Link>
                            </TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
            
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}
