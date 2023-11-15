/* eslint-disable @typescript-eslint/no-explicit-any */
import ArticuloInsumo from "../types/articuloInsumo";


const API_BASE_URL: string = 'https://empresaurios-api.onrender.com/api/v1/articulosinsumos';

const fetchApiCall = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', id?: number, payload?: ArticuloInsumo): Promise<any> => {
  const options: any = { headers: { 'Content-Type': 'application/json','Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VybmFtZTEyMyIsImlhdCI6MTcwMDA4NjcxOSwiZXhwIjoxNzAwMDg4MTU5fQ.jnzxaCrIykpUHFaxv37Efooo8Jd2bMxMc9k18S34-fk' }, method };
  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(id ? `${API_BASE_URL}/${id}` : API_BASE_URL, options);
  const data = await response.json();

  return data;
};

const fnCreateArticuloInsumo = async (articuloInsumo: ArticuloInsumo) => fetchApiCall('POST', undefined, articuloInsumo);
const fnDeleteArticuloInsumo = async (id: number) => fetchApiCall('DELETE', id);
const fnFetchArticuloInsumo = async () => fetchApiCall('GET');
const fnUpdateArticuloInsumo = async (articuloInsumo: ArticuloInsumo) => fetchApiCall('PUT', articuloInsumo.id, articuloInsumo);

type DataLayer = {
  create: {
    articuloInsumo: typeof fnCreateArticuloInsumo,
  },
  delete: {
    articuloInsumo: typeof fnDeleteArticuloInsumo,
  },
  fetch: {
    articuloInsumo: typeof fnFetchArticuloInsumo,
  },
  update: {
    articuloInsumo: typeof fnUpdateArticuloInsumo,
  }
};

const DataLayer: DataLayer = {
  create: {
    articuloInsumo: fnCreateArticuloInsumo,
  },
  delete: {
    articuloInsumo: fnDeleteArticuloInsumo,
  },
  fetch: {
    articuloInsumo: fnFetchArticuloInsumo,
  },
  update: {
    articuloInsumo: fnUpdateArticuloInsumo,
  }
};

export default DataLayer;
