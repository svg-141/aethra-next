import { CommentService, CreateCommentData } from '../../features/chat/services/commentService';

describe('CommentService', () => {
  beforeEach(() => {
    // Reset the service state before each test
    CommentService.initializeWithSampleData();
  });

  describe('createComment', () => {
    it('should create a new comment successfully', async () => {
      const commentData: CreateCommentData = {
        content: 'This is a test comment with enough characters',
        sectionId: 'test-section',
        author: 'TestUser',
        avatar: 'https://example.com/avatar.jpg'
      };

      const comment = await CommentService.createComment(commentData);

      expect(comment).toBeDefined();
      expect(comment.content).toBe(commentData.content);
      expect(comment.author).toBe(commentData.author);
      expect(comment.section).toBe(commentData.sectionId);
      expect(comment.likes).toBe(0);
      expect(comment.createdAt).toBeInstanceOf(Date);
    });
  });

  describe('getComments', () => {
    it('should retrieve comments by section', async () => {
      // Create a test comment first
      await CommentService.createComment({
        content: 'Test comment for retrieval',
        sectionId: 'test-section',
        author: 'TestUser'
      });

      const result = await CommentService.getComments({ sectionId: 'test-section' });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].section).toBe('test-section');
    });

    it('should support pagination', async () => {
      // Create multiple test comments
      for (let i = 0; i < 5; i++) {
        await CommentService.createComment({
          content: `Test comment ${i} with sufficient length`,
          sectionId: 'pagination-test',
          author: 'TestUser'
        });
      }

      const result = await CommentService.getComments({
        sectionId: 'pagination-test',
        limit: 2,
        offset: 1
      });

      expect(result.length).toBeLessThanOrEqual(2);
    });
  });

  describe('likeComment', () => {
    it('should increment like count when liking a comment', async () => {
      const comment = await CommentService.createComment({
        content: 'Test comment to be liked',
        sectionId: 'like-test',
        author: 'TestUser'
      });

      const likedComment = await CommentService.likeComment(comment.id);

      expect(likedComment).toBeDefined();
      expect(likedComment!.likes).toBe(1);
    });

    it('should decrement like count when unliking a comment', async () => {
      const comment = await CommentService.createComment({
        content: 'Test comment to be liked and unliked',
        sectionId: 'unlike-test',
        author: 'TestUser'
      });

      // Like first
      await CommentService.likeComment(comment.id);
      
      // Then unlike
      const unlikedComment = await CommentService.unlikeComment(comment.id);

      expect(unlikedComment).toBeDefined();
      expect(unlikedComment!.likes).toBe(0);
    });
  });

  describe('updateComment', () => {
    it('should update comment content successfully', async () => {
      const comment = await CommentService.createComment({
        content: 'Original comment content',
        sectionId: 'update-test',
        author: 'TestUser'
      });

      const updatedComment = await CommentService.updateComment(comment.id, {
        content: 'Updated comment content with sufficient length'
      });

      expect(updatedComment).toBeDefined();
      expect(updatedComment!.content).toBe('Updated comment content with sufficient length');
      expect(updatedComment!.isEdited).toBe(true);
      expect(updatedComment!.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('deleteComment', () => {
    it('should delete a comment successfully', async () => {
      const comment = await CommentService.createComment({
        content: 'Comment to be deleted',
        sectionId: 'delete-test',
        author: 'TestUser'
      });

      const deleted = await CommentService.deleteComment(comment.id);

      expect(deleted).toBe(true);

      // Verify comment is no longer retrievable
      const retrievedComment = await CommentService.getCommentById(comment.id);
      expect(retrievedComment).toBeNull();
    });
  });

  describe('searchComments', () => {
    it('should find comments by content search', async () => {
      await CommentService.createComment({
        content: 'This comment contains the word SEARCHTERM for testing',
        sectionId: 'search-test',
        author: 'TestUser'
      });

      const results = await CommentService.searchComments('SEARCHTERM');

      expect(results.length).toBeGreaterThan(0);
      expect(results[0].content.toLowerCase()).toContain('searchterm');
    });
  });

  describe('getCommentStats', () => {
    it('should return correct statistics', async () => {
      // Create some test comments
      await CommentService.createComment({
        content: 'Stats test comment one',
        sectionId: 'stats-test',
        author: 'TestUser1'
      });

      await CommentService.createComment({
        content: 'Stats test comment two',
        sectionId: 'stats-test',
        author: 'TestUser2'
      });

      const stats = await CommentService.getCommentStats('stats-test');

      expect(stats.total).toBeGreaterThanOrEqual(2);
      expect(stats.topAuthors).toBeInstanceOf(Array);
      expect(typeof stats.todayCount).toBe('number');
      expect(typeof stats.weekCount).toBe('number');
    });
  });
});