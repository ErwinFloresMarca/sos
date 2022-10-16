import useService from '@/api/http';

const useFileApi = () => {
  const service = useService();
  const endpoint = 'files';
  const baseApiUrl = process.env.VUE_APP_API_URL;
  return {
    downloadUrl: (filename: string) => `${baseApiUrl}/${endpoint}/${filename}`,
    downloadUrlById: (fileId: number) => `${baseApiUrl}/${endpoint}/download/by-id/${fileId}`,
    getBase64ById: (fileId: number) => service.get(`${baseApiUrl}/${endpoint}/base64/by-id/${fileId}`),
    getById: (id: string | number) => service.get(`${endpoint}/by-id/${id}`),
    createUrl: () => `${baseApiUrl}/${endpoint}`,
  };
};

export default useFileApi;
