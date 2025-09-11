import { ForumService, CreatePostData, UpdatePostData } from '../../features/community/services/forumService';

describe('ForumService', () => {
  beforeEach(() => {
    // Initialize with sample data before each test
    ForumService.initializeWithSampleData();
  });

  describe('createPost', () => {
    it('should create a new post successfully', async () => {
      const postData: CreatePostData = {
        title: 'Test Post Title',
        content: 'This is a test post content with sufficient length for validation.',
        category: 'general',
        tags: ['test', 'general'],
        authorId: 'currentUser'
      };

      const post = await ForumService.createPost(postData);

      expect(post).toBeDefined();
      expect(post.title).toBe(postData.title);
      expect(post.content).toBe(postData.content);
      expect(post.category).toBe(postData.category);
      expect(post.tags).toEqual(postData.tags);
      expect(post.author.id).toBe(postData.authorId);
      expect(post.likes).toBe(0);
      expect(post.comments).toBe(0);
      expect(post.views).toBe(1);
      expect(post.createdAt).toBeInstanceOf(Date);
      expect(post.isPinned).toBe(false);
      expect(post.isLocked).toBe(false);
    });
  });

  describe('getPosts', () => {
    it('should retrieve posts with default parameters', async () => {
      const result = await ForumService.getPosts();

      expect(result).toBeDefined();
      expect(Array.isArray(result.posts)).toBe(true);
      expect(typeof result.total).toBe('number');
      expect(typeof result.hasMore).toBe('boolean');
      expect(result.posts.length).toBeGreaterThan(0);
    });

    it('should filter posts by category', async () => {
      const result = await ForumService.getPosts({ category: 'strategy' });

      expect(result.posts.every(post => post.category === 'strategy')).toBe(true);
    });

    it('should search posts by query', async () => {
      const result = await ForumService.getPosts({ query: 'Valorant' });

      const hasValorantContent = result.posts.some(post =>
        post.title.toLowerCase().includes('valorant') ||
        post.content.toLowerCase().includes('valorant') ||
        post.tags.some(tag => tag.toLowerCase().includes('valorant'))
      );

      expect(hasValorantContent).toBe(true);
    });

    it('should sort posts correctly', async () => {
      const popularResult = await ForumService.getPosts({ sortBy: 'popular' });
      const newestResult = await ForumService.getPosts({ sortBy: 'newest' });

      expect(popularResult.posts.length).toBeGreaterThan(0);
      expect(newestResult.posts.length).toBeGreaterThan(0);

      // Check if popular sorting works (first post should have more or equal likes than second)
      if (popularResult.posts.length > 1) {
        expect(popularResult.posts[0].likes).toBeGreaterThanOrEqual(popularResult.posts[1].likes);
      }

      // Check if newest sorting works (first post should be newer or same time as second)
      if (newestResult.posts.length > 1) {
        expect(newestResult.posts[0].createdAt.getTime()).toBeGreaterThanOrEqual(
          newestResult.posts[1].createdAt.getTime()
        );
      }
    });

    it('should support pagination', async () => {
      const firstPage = await ForumService.getPosts({ limit: 2, offset: 0 });
      const secondPage = await ForumService.getPosts({ limit: 2, offset: 2 });

      expect(firstPage.posts.length).toBeLessThanOrEqual(2);
      expect(secondPage.posts.length).toBeLessThanOrEqual(2);

      // Posts should be different between pages
      if (firstPage.posts.length > 0 && secondPage.posts.length > 0) {
        expect(firstPage.posts[0].id).not.toBe(secondPage.posts[0].id);
      }
    });
  });

  describe('getPostById', () => {
    it('should retrieve a specific post and increment views', async () => {
      // First, get all posts to find a valid ID
      const allPosts = await ForumService.getPosts();
      expect(allPosts.posts.length).toBeGreaterThan(0);

      const postId = allPosts.posts[0].id;
      const originalViews = allPosts.posts[0].views;

      const post = await ForumService.getPostById(postId);

      expect(post).toBeDefined();
      expect(post!.id).toBe(postId);
      expect(post!.views).toBe(originalViews + 1);
    });

    it('should return null for non-existent post', async () => {
      const post = await ForumService.getPostById('non-existent-id');
      expect(post).toBeNull();
    });
  });

  describe('updatePost', () => {
    it('should update post successfully', async () => {
      // Create a post first
      const newPost = await ForumService.createPost({
        title: 'Original Title',
        content: 'Original content for testing update functionality.',
        category: 'general',
        tags: ['original'],
        authorId: 'currentUser'
      });

      const updateData: UpdatePostData = {
        title: 'Updated Title',
        content: 'Updated content for testing update functionality.'
      };

      const updatedPost = await ForumService.updatePost(newPost.id, updateData, 'currentUser');

      expect(updatedPost).toBeDefined();
      expect(updatedPost!.title).toBe(updateData.title);
      expect(updatedPost!.content).toBe(updateData.content);
      expect(updatedPost!.isEdited).toBe(true);
      expect(updatedPost!.updatedAt).toBeInstanceOf(Date);
    });

    it('should reject update from wrong author', async () => {
      const newPost = await ForumService.createPost({
        title: 'Test Post',
        content: 'Test content for authorization testing.',
        category: 'general',
        tags: ['test'],
        authorId: 'user1'
      });

      await expect(
        ForumService.updatePost(newPost.id, { title: 'Unauthorized Update' }, 'user2')
      ).rejects.toThrow('No tienes permisos para editar este post');
    });
  });

  describe('deletePost', () => {
    it('should delete post successfully', async () => {
      const newPost = await ForumService.createPost({
        title: 'Post to Delete',
        content: 'This post will be deleted for testing purposes.',
        category: 'general',
        tags: ['delete-test'],
        authorId: 'currentUser'
      });

      const deleted = await ForumService.deletePost(newPost.id, 'currentUser');
      expect(deleted).toBe(true);

      // Verify post is no longer accessible
      const retrievedPost = await ForumService.getPostById(newPost.id);
      expect(retrievedPost).toBeNull();
    });

    it('should reject delete from wrong author', async () => {
      const newPost = await ForumService.createPost({
        title: 'Protected Post',
        content: 'This post should not be deletable by other users.',
        category: 'general',
        tags: ['protected'],
        authorId: 'user1'
      });

      await expect(
        ForumService.deletePost(newPost.id, 'user2')
      ).rejects.toThrow('No tienes permisos para eliminar este post');
    });
  });

  describe('likePost', () => {
    it('should like and unlike a post', async () => {
      const allPosts = await ForumService.getPosts();
      const post = allPosts.posts[0];
      const originalLikes = post.likes;

      // Like the post
      const likedPost = await ForumService.likePost(post.id, 'testUser');
      expect(likedPost).toBeDefined();
      expect(likedPost!.likes).toBe(originalLikes + 1);
      expect(likedPost!.likedBy).toContain('testUser');

      // Unlike the post
      const unlikedPost = await ForumService.likePost(post.id, 'testUser');
      expect(unlikedPost).toBeDefined();
      expect(unlikedPost!.likes).toBe(originalLikes);
      expect(unlikedPost!.likedBy).not.toContain('testUser');
    });
  });

  describe('addCommentToPost', () => {
    it('should add comment to post successfully', async () => {
      const allPosts = await ForumService.getPosts();
      const post = allPosts.posts[0];
      const originalComments = post.comments;

      const updatedPost = await ForumService.addCommentToPost(
        post.id,
        'This is a test comment with sufficient length.',
        'currentUser'
      );

      expect(updatedPost).toBeDefined();
      expect(updatedPost!.comments).toBe(originalComments + 1);
      expect(updatedPost!.replies).toBeDefined();
      expect(updatedPost!.replies!.length).toBeGreaterThan(0);
      
      const newComment = updatedPost!.replies![0];
      expect(newComment.content).toBe('This is a test comment with sufficient length.');
    });
  });

  describe('toggleBookmark', () => {
    it('should bookmark and unbookmark a post', async () => {
      const allPosts = await ForumService.getPosts();
      const post = allPosts.posts[0];

      // Bookmark the post
      const bookmarked = await ForumService.toggleBookmark(post.id, 'testUser');
      expect(bookmarked).toBe(true);

      // Unbookmark the post
      const unbookmarked = await ForumService.toggleBookmark(post.id, 'testUser');
      expect(unbookmarked).toBe(false);
    });
  });

  describe('reportPost', () => {
    it('should report a post successfully', async () => {
      const allPosts = await ForumService.getPosts();
      const post = allPosts.posts[0];

      const reported = await ForumService.reportPost(
        post.id,
        'Inappropriate content',
        'reporterUser'
      );

      expect(reported).toBe(true);
    });
  });

  describe('getForumStats', () => {
    it('should return forum statistics', async () => {
      const stats = await ForumService.getForumStats();

      expect(stats).toBeDefined();
      expect(typeof stats.totalPosts).toBe('number');
      expect(typeof stats.totalAuthors).toBe('number');
      expect(typeof stats.todayPosts).toBe('number');
      expect(typeof stats.weekPosts).toBe('number');
      expect(Array.isArray(stats.popularCategories)).toBe(true);
      expect(Array.isArray(stats.topAuthors)).toBe(true);

      expect(stats.totalPosts).toBeGreaterThan(0);
      expect(stats.totalAuthors).toBeGreaterThan(0);
    });
  });

  describe('searchPosts', () => {
    it('should search posts and return suggestions', async () => {
      const result = await ForumService.searchPosts('Valorant');

      expect(result).toBeDefined();
      expect(Array.isArray(result.posts)).toBe(true);
      expect(typeof result.total).toBe('number');
      expect(Array.isArray(result.suggestions)).toBe(true);

      if (result.posts.length > 0) {
        const hasRelevantContent = result.posts.some(post =>
          post.title.toLowerCase().includes('valorant') ||
          post.content.toLowerCase().includes('valorant') ||
          post.tags.some(tag => tag.toLowerCase().includes('valorant'))
        );
        expect(hasRelevantContent).toBe(true);
      }
    });

    it('should provide search suggestions', async () => {
      const result = await ForumService.searchPosts('strat');

      expect(result.suggestions).toBeDefined();
      expect(Array.isArray(result.suggestions)).toBe(true);

      if (result.suggestions.length > 0) {
        const hasRelevantSuggestion = result.suggestions.some(suggestion =>
          suggestion.includes('strat')
        );
        expect(hasRelevantSuggestion).toBe(true);
      }
    });
  });
});