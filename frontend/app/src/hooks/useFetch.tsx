import { useEffect, useState } from 'react'
import { axiosInstance, cache } from '../api'

function useFetch<T>(url: string) {
  const [result, setResult] = useState<{ data: T | null; error: string | null }>({
    data: null,
    error: null,
  })

  useEffect(() => {
    if (cache[url]) {
      setResult({ data: cache[url], error: null })
    }

    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get<T>(url)
        setResult({ data, error: null })
      } catch (err: any) {
        setResult({ data: null, error: err.message })
      }
    };

    fetchData()
  }, [url])

  return result
}

export default useFetch