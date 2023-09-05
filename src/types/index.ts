export namespace Blog {
  export interface Post {
    id: number
    title: String
    body: String
  }

  export enum Path {
    HOME = '/',
    POSTS = 'posts',
    POST_DETAILS = 'post_details'
  }
}
