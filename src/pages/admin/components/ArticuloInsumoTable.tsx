/* eslint-disable @typescript-eslint/no-explicit-any */
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';

import ArticuloInsumo from "../../../types/articuloInsumo";
import DataLayer from '../../../services/data-layer';

const DeleteArticuloInsumoModal = React.lazy(() => import('./DeleteArticuloInsumoModal'));
const SaveArticuloInsumoModal = React.lazy(() => import('./SaveArticuloInsumoModal'));

type ArticuloInsumoTableProps = {
  articuloInsumo: ArticuloInsumo[];
};

const emptyArticuloInsumo: ArticuloInsumo = {
  id: 0,
  denominacion: "",
  precioCompra: 0,
  stockActual: 0,
  stockMinimo: 0,
  urlImagen: "",
};

const ArticuloInsumoTable: React.FC<ArticuloInsumoTableProps> = ({ articuloInsumo }) => {
  // State
  const [error, setError] = React.useState<any>(null);
  const [listedArticuloInsumo, setListedArticuloInsumo] = React.useState<ArticuloInsumo[]>(articuloInsumo);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedArticuloInsumo, setselectedArticuloInsumo] = React.useState<ArticuloInsumo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = React.useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = React.useState<boolean>(false);

  // Handlers
  const onCloseDeleteModal = React.useCallback(() => setShowDeleteModal(false), [setShowDeleteModal]);
  const onCloseSaveModal = React.useCallback(() => setShowSaveModal(false), [setShowSaveModal]);
  const onDelete = React.useCallback(() => {
    if (selectedArticuloInsumo) {
      setShowDeleteModal(false);
      setLoading(true);
      DataLayer.delete.articuloInsumo(selectedArticuloInsumo.id!)
        .then(() => setListedArticuloInsumo((prevState: ArticuloInsumo[]) => prevState.filter((item: ArticuloInsumo) => item.id !== selectedArticuloInsumo.id)))
        .catch((error: any) => setError(error))
        .finally(() => setLoading(false));
    }
  }, [selectedArticuloInsumo, setShowDeleteModal, setListedArticuloInsumo, setLoading]);
  const onSave = React.useCallback((a: ArticuloInsumo) => {
    if (selectedArticuloInsumo) {
      setShowSaveModal(false);
      setLoading(true);
      if (a.id) {
        DataLayer.update.articuloInsumo(a)
          .then((editedArticuloInsumo: ArticuloInsumo) => setListedArticuloInsumo((prevState: ArticuloInsumo[]) => prevState.map((item: ArticuloInsumo) => item.id === editedArticuloInsumo.id ? editedArticuloInsumo : item)))
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      } else {
        
        // Delete id property since it is a create action
        delete (a as any).id; 

        DataLayer.create.articuloInsumo(a)
          .then((createdArticuloInsumo: ArticuloInsumo) => {
            setListedArticuloInsumo((prevState: ArticuloInsumo[]) => [...prevState, createdArticuloInsumo]);
          })
          .catch((error: any) => setError(error))
          .finally(() => setLoading(false));
      }
    }
  }, [selectedArticuloInsumo, setShowSaveModal, setListedArticuloInsumo, setLoading]);
  const onShowDeleteModal = React.useCallback((a: ArticuloInsumo) => {
    setselectedArticuloInsumo(a);
    setShowDeleteModal(true);
  }, [setselectedArticuloInsumo, setShowDeleteModal]);
  const onShowSaveModal = React.useCallback((p?: ArticuloInsumo) => {
    setselectedArticuloInsumo(p ?? emptyArticuloInsumo);
    setShowSaveModal(true);
  }, [setselectedArticuloInsumo, setShowSaveModal])

  // Render
  if (error) {
    return (
      <Alert variant="danger">
        {error?.message || 'Something went wrong while fetching products.'}
      </Alert>
    );
  }

  return (
    <React.Suspense fallback={<Spinner animation="border" />}>
      {
        loading
          ? (
            <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100wh' }}>
              <Spinner animation="border" />
            </div>
          )
          : (
            <>
              <Button onClick={() => onShowSaveModal()} style={{ float: 'left',  marginTop: '70px', marginBottom: '10px' }} variant="primary">Crear Articulo Insumo</Button>
              <Table striped bordered hover className="table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>denominacion</th>
                    <th>precioCompra</th>
                    <th>StockActual</th>
                    <th>StockMinimo</th>
                    <th>urlImagen</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    listedArticuloInsumo.map((a: ArticuloInsumo) => (
                      <tr key={a.id}>
                        <td width='2%'>{a.id}</td>
                        <td width='23%'>{a.denominacion}</td>
                        <td width='45%'>{a.precioCompra}</td>
                        <td width='10%'>{a.stockActual}</td>
                        <td width='5%'>{a.stockMinimo}</td>
                        <td width='5%'>{a.urlImagen}</td>
                        <td width='10%'>
                          <Button onClick={() => onShowSaveModal(a)} variant="link" className="table-btn-editar">Editar</Button>
                          <Button onClick={() => onShowDeleteModal(a)} variant="link" className="table-btn-eliminar">Eliminar</Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </>
          )
      }
      <DeleteArticuloInsumoModal
        onDelete={onDelete}
        onHide={onCloseDeleteModal}
        articuloInsumo={selectedArticuloInsumo}
        show={showDeleteModal}
      />
      <SaveArticuloInsumoModal
        onHide={onCloseSaveModal}
        onSave={onSave}
        articuloInsumo={selectedArticuloInsumo}
        show={showSaveModal}
      />
    </React.Suspense>
  );
};

export default ArticuloInsumoTable;