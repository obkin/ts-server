import { PostModel } from '@prisma/client';
import { PostCreateDto } from './dto/post-create-dto';
import { Post } from './post.entity';

interface IPostsService {
	createPost(dto: PostCreateDto, userId: number): Promise<PostModel | void>;
	getOnePost(postId: number): Promise<PostModel | null>;
	getAllPosts(limit?: number, page?: number): Promise<any | void>;
	getAllUserPosts(userId: number, limit?: number, page?: number): Promise<any | void>;
	removePost(postId: number, userId: number): Promise<any | void>;
	updatePost(postId: number, updatedData: Post, userId: number): Promise<PostModel | void>;
}

export { IPostsService };
