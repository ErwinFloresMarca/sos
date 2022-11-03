import useService from '@/api/http';
import { Pariente } from '../types';

const useParienteApi = () => {
  const service = useService();
  const endpoint = 'positions';
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: Partial<Pariente>) => service.get(`/${endpoint}/${id}`, data),
    create: (data: Partial<Pariente>) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: Partial<Pariente>) => service.patch(`/${endpoint}/${id}`, data),
    remove: (id: number | string) => service.delete(`/${endpoint}/${id}`),
  };
};

export default useParienteApi;
