import { ref } from 'vue'

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
}

export function usePosts() {
  const posts = ref<Post[]>([
    {
      id: '1',
      title: 'Chia sẻ kinh nghiệm học tiếng Anh hiệu quả',
      content: 'Sau nhiều năm học tiếng Anh, tôi muốn chia sẻ một số phương pháp đã giúp tôi cải thiện khả năng ngôn ngữ của mình...',
      author: {
        name: 'Nguyễn Văn A',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      createdAt: '2024-03-20T10:00:00Z',
      likes: 15,
      comments: 5
    },
    {
      id: '2',
      title: 'Làm thế nào để duy trì động lực học tập?',
      content: 'Việc duy trì động lực học tập luôn là thách thức lớn đối với nhiều người. Hôm nay tôi sẽ chia sẻ những bí quyết...',
      author: {
        name: 'Trần Thị B',
        avatar: 'https://i.pravatar.cc/150?img=2'
      },
      createdAt: '2024-03-19T15:30:00Z',
      likes: 23,
      comments: 8
    }
  ])

  return {
    posts
  }
}