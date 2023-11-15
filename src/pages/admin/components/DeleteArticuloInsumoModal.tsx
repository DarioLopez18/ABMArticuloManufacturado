import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';

import ArticuloInsumo from '../../../types/articuloInsumo';

type DeleteArticuloInsumoModal = {
  onDelete: () => void;
  onHide: () => void;
  articuloInsumo: ArticuloInsumo | null;
  show: boolean;
};


const DeleteArticuloInsumoModal: React.FC<DeleteArticuloInsumoModal> = ({ onDelete, onHide, articuloInsumo, show }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Eliminar ArticuloInsumo</Modal.Title>
    </Modal.Header>
    <Modal.Body>Está seguro que quiere eliminar el siguiente articulo insumo: <strong>{articuloInsumo?.id}</strong><strong>{articuloInsumo?.denominacion}</strong> <strong>{articuloInsumo?.precioCompra}</strong><strong>{articuloInsumo?.stockActual}</strong><strong>{articuloInsumo?.stockMinimo}</strong><strong>{articuloInsumo?.urlImagen}</strong></Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Cerrar
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Eliminar
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteArticuloInsumoModal;
