export const showCustomMessage = (type: 'success' | 'error', message: string) => {
    ElMessage({
      message,
      type,
      customClass: `
        !rounded-md
        !bg-white 
        !border 
        !shadow-lg 
        !px-4 
        !py-3
        ${type === 'success' ? '!border-green-100 !text-green-600' : ''}
        ${type === 'error' ? '!border-red-100 !text-red-600' : ''}
      `,
      duration: 2000,
      offset: 60
    });
  };