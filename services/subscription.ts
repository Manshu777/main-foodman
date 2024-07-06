import { Paginate, SuccessResponse } from "interfaces";
import request from "./request";

const subscriptionService = {
  getAll: (params?: any): Promise<Paginate<any>> =>
    request.get(`rest/subscriptions/paginate`, { params }),
  getById: (id: string, params?: any): Promise<SuccessResponse<any>> =>
    request.get(`/rest/blogs/${id}`, { params }),
  getLastBlog: (params?: any): Promise<SuccessResponse<any>> =>
    request.get(`rest/last-blog/show`, { params }),
  getAllNews: (params?: any): Promise<Paginate<any>> =>
    request.get(`/rest/blogs/paginate?type=notification`, { params }),
  getNewsById: (id: string, params?: any): Promise<SuccessResponse<any>> =>
    request.get(`/rest/blogs/${id}`, { params }),
  create: (id: any) =>
    request.post(`dashboard/seller/subscriptions/${id}/attach`),
};

export default subscriptionService;
