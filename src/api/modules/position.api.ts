import useService from '@/api/http';
import { Position } from '../types/position';

const usePositionApi = () => {
  const service = useService();
  const endpoint = 'positions';
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: Partial<Position>) => service.get(`/${endpoint}/${id}`, data),
    create: (data: Partial<Position>) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: Partial<Position>) => service.patch(`/${endpoint}/${id}`, data),
    remove: (id: number | string) => service.delete(`/${endpoint}/${id}`),
  };
};

export default usePositionApi;
