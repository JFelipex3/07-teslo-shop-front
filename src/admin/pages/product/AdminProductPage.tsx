// https://github.com/Klerith/bolt-product-editor
import { useParams, Navigate, useNavigate } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, data: producto, mutation } = useProduct(id || '');

  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmit = async( productLike: Partial<Product> ) => {
    await mutation.mutateAsync(productLike, {
      onSuccess: ( data ) => {
        toast.success(`Producto ${ id === 'new' ? 'creado' : 'actualizado' } con éxito`, { position: 'top-right' });
        navigate(`/admin/products/${data.id}`);
      },
      onError: ( error ) => {
        toast.error(`Error al ${ id === 'new' ? 'crear' : 'actualizar' } el producto: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    });
  }

  // Redirecciones
  if ( isError ) {
    return <Navigate to='/admin/products' />
  }

  if ( isLoading ) {
    return <CustomFullScreenLoading />
  }

  if ( !producto ) {
    return <Navigate to='/admin/products' />
  }

  return <AdminProductForm title={ productTitle } subTitle={ productSubtitle } product={ producto } onSubmit={handleSubmit} isPending={mutation.isPending} />;
};