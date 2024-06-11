import { baseService } from "./baseService";

export class PostSerivce extends baseService {
  getListPost = (param) => {
    return this.get(`Post/Posts?${param}`)
  }

  getLatestPost = () => {
    return this.get('Post/LatestPost')
  }

  getPostByID = (id) => {
    return this.get(`Post/DetailPost/${id}`)
  }

  createPost = (datajson) => {
    return this.post(`Post/CreatePost`, datajson)
  }

  updatePost = (id, datajson) => {
    return this.put(`Post/UpdatePost/${id}`, datajson)
  }

  removePost = (id) => {
    return this.delete(`Post/DeletePost?id=${id}`)
  }
}

export const postService = new PostSerivce()