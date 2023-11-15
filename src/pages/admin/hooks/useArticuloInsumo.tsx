/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import DataLayer from '../../../services/data-layer';
import ArticuloInsumo from '../../../types/articuloInsumo';

type UseArticuloInsumoState = {
  data: ArticuloInsumo[];
  error: any;
  loading: boolean;
};

const initialState: UseArticuloInsumoState = {
  data: [],
  error: null,
  loading: true,
};

const useArticuloInsumo = () => {
  // State
  const [state, setState] = React.useState<UseArticuloInsumoState>(initialState);

  // Effects
  React.useEffect(function fetchArticuloInsumo() {
    DataLayer.fetch.articuloInsumo()
      .then((data: ArticuloInsumo[]) => setState({ data, error: null, loading: false }))
      .catch((error: any) => setState({ data: [], error, loading: false }));
  }, [setState]);

  return state;
};

export default useArticuloInsumo;