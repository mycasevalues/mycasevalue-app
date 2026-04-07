'use client';

import { useTranslation } from '@/lib/useTranslation';

export function BlogTranslations() {
  const { t, locale, mounted } = useTranslation();

  if (!mounted) {
    return null;
  }

  return {
    blog: t('blog.blog'),
    readMore: t('blog.readMore'),
    published: t('blog.published'),
    author: t('blog.author'),
    relatedPosts: t('blog.relatedPosts'),
    latestArticles: t('blog.latestArticles'),
    searchBlog: t('blog.searchBlog'),
    categories: t('blog.categories'),
    archives: t('blog.archives'),
    shareArticle: t('blog.shareArticle'),
  };
}

export function useBlogTranslations() {
  const { t } = useTranslation();

  return {
    blog: t('blog.blog'),
    readMore: t('blog.readMore'),
    published: t('blog.published'),
    author: t('blog.author'),
    relatedPosts: t('blog.relatedPosts'),
    latestArticles: t('blog.latestArticles'),
    searchBlog: t('blog.searchBlog'),
    categories: t('blog.categories'),
    archives: t('blog.archives'),
    shareArticle: t('blog.shareArticle'),
  };
}
