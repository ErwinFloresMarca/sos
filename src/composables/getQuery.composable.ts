import { AnyObject } from '@/types';
import { ref } from 'vue';

export default function useGetQueryComposable() {
  const pagination = ref({
    page: 1,
    limit: 5,
    total: 0,
  });

  const paginate = ref(true);
  const order = ref<string | Array<string>>('');
  const where = ref<AnyObject>({});
  const fields = ref<AnyObject>({});
  const include = ref<Array<AnyObject | string> | undefined>([]);
  const getFilterObject = () => {
    const pagData: { skip?: number; limit?: number } = {};
    if (paginate.value) {
      pagData.skip = (pagination.value.page - 1) * pagination.value.limit;
      pagData.limit = pagination.value.limit;
    }
    return {
      filter: {
        ...pagData,
        order: order.value,
        where: where.value,
        fields: Object.keys(fields.value).length > 0 ? fields.value : undefined,
        include: include.value && include.value.length > 0 ? include.value : undefined,
      },
    };
  };
  return {
    pagination,
    paginate,
    order,
    where,
    fields,
    include,
    getFilterObject,
  };
}
