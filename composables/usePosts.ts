import type { Post } from '~/types/post.types'

export const usePosts = () => {
  const posts = ref<Post[]>([
    {
      id: '1',
      author: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      title: 'Hỏi về toán cao cấp',
      content: 'Ai có thể giải thích cho mình về đạo hàm riêng phần không?',
      comments: 5,
      likes: 12,
      time: '2h'
    },
    {
      id: '2',
      author: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      title: 'Lập trình Python cơ bản',
      content: 'Mình đang học Python, ai có tài liệu tốt chia sẻ với mình được không?',
      comments: 3,
      likes: 8,
      time: '4h'
    },
  ])

  return {
    posts
  }
}