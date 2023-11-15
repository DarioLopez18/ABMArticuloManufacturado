import Alert from "react-bootstrap/Alert";
import * as React from 'react';
import Spinner from "react-bootstrap/Spinner";
import useArticuloInsumo from "./hooks/useArticuloInsumo";

const ArticuloInsumoTable = React.lazy(() => import('./components/ArticuloInsumoTable'));

const Admin: React.FC = () => {
  // Utils
  const { data, error, loading } = useArticuloInsumo();

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return loading
    ? (
      <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
        <Spinner animation="border" />
      </div>
    )
    : (
      <React.Suspense fallback={<Spinner animation="border" />}>
        <ArticuloInsumoTable articuloInsumo={data} />
      </React.Suspense>
    )
};

export default Admin;