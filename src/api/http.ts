import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import showCodeMessage from '@/api/code';
import { formatJsonToUrlParams, instanceObject } from '@/utils/format';
import useAuth from '@/store/auth';
import { showToast } from '@/helpers/toast.helper';

const BASE_PREFIX = process.env.VUE_APP_API_URL;

const useAxiosInstance = (): AxiosInstance => {
  // Crear instancia
  const axiosInstance: AxiosInstance = axios.create({
    // prefijo
    baseURL: BASE_PREFIX,
    // Se acabó el tiempo
    timeout: 1000 * 30,
    // encabezado de solicitud
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // interceptor de solicitudes
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const auth = useAuth();
      // TODO Aquí puede agregar la lógica que desea procesar antes de enviar la solicitud
      // TODO loading
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${auth.token}`,
      };
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  // interceptor de respuesta
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status < 300) {
        return response;
      }
      if (response.status >= 400)
        showToast({ message: JSON.stringify(response.status), type: 'danger', closable: true });
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;
      if (response) {
        showToast({ message: showCodeMessage(response.status), type: 'danger', closable: true });
        if (response.status === 401) {
          // eslint-disable-next-line no-shadow
          const auth = useAuth();
          auth.logout();
        }
        return Promise.reject(response.data);
      }
      showToast({
        message: 'Conexión de red defectuosa, Por favor, inténtelo de nuevo más tarde!',
        type: 'warning',
        closable: true,
      });
      return Promise.reject(error);
    },
  );
  return axiosInstance;
};
interface Service {
  get: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  post: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  put: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  patch: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  delete: (url: string, data?: object) => Promise<AxiosResponse<any, any>>;
  upload: (url: string, file: File) => Promise<AxiosResponse<any, any>>;
  download: (url: string, data: instanceObject) => void;
}

const useService = (): Service => {
  const axiosInstance = useAxiosInstance();
  return {
    get: (url: string, data?: object) => axiosInstance.get(url, { params: data }),
    post: (url: string, data?: object) => axiosInstance.post(url, data),
    put: (url: string, data?: object) => axiosInstance.put(url, data),
    patch: (url: string, data?: object) => axiosInstance.patch(url, data),
    delete: (url: string) => axiosInstance.delete(url),
    upload: (url: string, file: File) =>
      axiosInstance.post(url, file, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    download: (url: string, data: instanceObject) => {
      const downloadUrl = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(data)}`;
      window.location.href = downloadUrl;
    },
  };
};

export default useService;
