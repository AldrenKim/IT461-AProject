type BaseData<T> = {
  data: T[];
  metadata: {
    links: {
      curr: string | null;
      last: string | null;
      next: string | null;
      prev: string | null;
      start: string | null;
    };
    total: number;
  };
};

export default BaseData;
