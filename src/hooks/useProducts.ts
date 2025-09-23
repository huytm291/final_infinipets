// hooks/useProducts.ts - Products hook with API integration
import { useState, useEffect } from 'react';
import { Product, SearchFilters } from '@/lib/types';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

export function useProducts(filters?: SearchFilters, page = 1, limit = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, [filters, page, limit]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.getProducts(filters, page, limit);
      
      if (response.success && response.data) {
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } else {
        setError(response.error || 'Failed to fetch products');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching products';
      setError(errorMessage);
      toast.error('Failed to load products', {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    fetchProducts();
  };

  return {
    products,
    isLoading,
    error,
    pagination,
    refetch,
  };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.getProductById(id);
      
      if (response.success && response.data) {
        setProduct(response.data);
      } else {
        setError(response.error || 'Product not found');
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred while fetching product';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    product,
    isLoading,
    error,
    refetch: fetchProduct,
  };
}

export function useProductSearch() {
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string, filters?: SearchFilters) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiService.searchProducts(query, filters);
      
      if (response.success && response.data) {
        setResults(response.data.products);
      } else {
        setError(response.error || 'Search failed');
        setResults([]);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setError(errorMessage);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  };
}