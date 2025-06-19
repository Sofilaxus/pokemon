import { useState } from "react";
import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

type UseAxiosProps<T> = {
    url: string;
    initialData: T | null;
    params?: any;
};

export function useAxios<T>(props: UseAxiosProps<T>) {
    const { url, initialData, params } = props;

    const [data, setData] = useState<T | null>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any | null>(null);

    const fetchData = async (config?: AxiosRequestConfig) => {
        try {
            setLoading(true);

            const response: AxiosResponse<T> = await axios.get(url, {
                paramsSerializer: {
                    indexes: null,
                },
                params,
                ...config,
            });
            setData(response.data);
            setError(null);
            return response;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError({
                status: axiosError?.response?.status,
                data: axiosError?.response?.data,
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        fetchData,
    };
}
