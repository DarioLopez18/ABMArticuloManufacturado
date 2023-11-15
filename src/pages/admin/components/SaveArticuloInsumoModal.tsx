import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import * as React from 'react';
import Row from 'react-bootstrap/Row';

import ArticuloInsumo from '../../../types/articuloInsumo';

type SaveArticuloInsumoModalProps = {
  onHide: () => void;
  onSave: (d: ArticuloInsumo) => void;
  articuloInsumo: ArticuloInsumo | null;
  show: boolean;
};

const SaveArticuloInsumoModal: React.FC<SaveArticuloInsumoModalProps> = ({ onSave, onHide, articuloInsumo, show }) => {
  // State
  const [validated, setValidated] = React.useState<boolean>(false);

  // Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === false) {
      setValidated(true);

      return;
    }

    const data = Object.fromEntries(new FormData(form));
    onSave({ ...articuloInsumo!, ...data });
  };

  // Render
  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate onSubmit={handleSubmit} validated={validated}>
        <Modal.Header closeButton>
          <Modal.Title>{articuloInsumo?.id === 0 ? 'Create' : 'Edit'} articuloInsumo </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Denominacion</Form.Label>
              <Form.Control
                defaultValue={articuloInsumo?.denominacion}
                name="denominacion"
                placeholder="denominacion"
                required
                type="text"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>precioCompra</Form.Label>
              <Form.Control
                defaultValue={articuloInsumo?.precioCompra}
                name="precioCompra"
                placeholder="precioCompra"
                required
                type="number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>stockActual</Form.Label>
              <Form.Control
                defaultValue={articuloInsumo?.stockActual}
                name="stockActual"
                placeholder="stockActual"
                required
                type="number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>stockMinimo</Form.Label>
              <Form.Control
                defaultValue={articuloInsumo?.stockMinimo}
                name="stockMinimo"
                placeholder="stockMinimo"
                required
                type="number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>urlImagen</Form.Label>
              <Form.Control
                defaultValue={articuloInsumo?.urlImagen}
                name="ulrImagen"
                placeholder="urlImagen"
                required
                type="text"
              />
            </Form.Group>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SaveArticuloInsumoModal;
