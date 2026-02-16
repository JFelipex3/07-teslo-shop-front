// https://github.com/Klerith/bolt-product-editor
import { useParams, Navigate } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullScreenLoading';
import { AdminProductForm } from './ui/AdminProductForm';

export const AdminProductPage = () => {
  const { id } = useParams();

  const { isLoading, isError, data: producto } = useProduct(id || '');

  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

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

  return <AdminProductForm title={ productTitle } subTitle={ productSubtitle } product={ producto } />;
};