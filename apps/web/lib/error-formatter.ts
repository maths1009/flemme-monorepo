export const formatErrorAttributes = (error: string): string => {
  
  return error.replace(/^\w+:\s*/, '');
};

export const formatApiErrors = (error: any): string[] => {
  if (!error) return ['An error occurred'];

  if (error.data && Array.isArray(error.data.message)) {
    return error.data.message.map((msg: string) => formatErrorAttributes(msg));
  }

  if (Array.isArray(error.message)) {
    return error.message.map((msg: string) => formatErrorAttributes(msg));
  }

  return [formatErrorAttributes(error.message || 'An error occurred')];
};
