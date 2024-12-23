import { apiConfig } from '../../config/apiConfig';
import { IProduct } from '../../data/types/product.types';
import { IRequestOptions } from '../../data/types/api.types';
import { IGetAllParams } from '../../data/types/api.types';

class ProductsController {
  async create(productData: IProduct, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product;
    const options: IRequestOptions = {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    };
    return await fetch(url, options);
  }

  async get(productId: string, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + '/';
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }

  async getAll(token: string, params: IGetAllParams = {}) {
    const { manufacturer, search, sortField, sortOrder } = params;
    let url = apiConfig.baseUrl + apiConfig.endpoints.product + '/';
    const queryParams = [];
    if (manufacturer) queryParams.push(`manufacturer=${manufacturer}`);
    if (search) queryParams.push(`search=${search}`);
    if (sortField) queryParams.push(`sortField=${sortField}`);
    if (sortOrder) queryParams.push(`sortOrder=${sortOrder}`);

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }
    const options: IRequestOptions = {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }

  async update(productId: string, productData: IProduct, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + '/';
    const options: IRequestOptions = {
      method: 'put',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    };
    return await fetch(url, options);
  }

  async delete(productId: string, token: string) {
    const url = apiConfig.baseUrl + apiConfig.endpoints.product + productId + '/';
    const options: IRequestOptions = {
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return await fetch(url, options);
  }
}

export default new ProductsController();
