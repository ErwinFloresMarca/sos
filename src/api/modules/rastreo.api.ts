import useService from '@/api/http';
import { Rastreo } from '../types/rastreo';

const useRastreoApi = () => {
  const service = useService();
  const endpoint = 'rastreos';
  return {
    count: (data: any) => service.get(`/${endpoint}/count`, data),
    list: (data: any) => service.get(`/${endpoint}`, data),
    getById: (id: string | number, data?: any) => service.get(`/${endpoint}/${id}`, data),
    create: (data: Partial<Rastreo>) => service.post(`/${endpoint}`, data),
    update: (id: number | string, data: Partial<Rastreo>) => service.patch(`/${endpoint}/${id}`, data),
    remove: (id: number | string) => service.delete(`/${endpoint}/${id}`),
  };
};

export default useRastreoApi;
