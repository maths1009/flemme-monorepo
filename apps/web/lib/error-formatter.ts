export const formatErrorAttributes = (error: string): string => {
  // Regex to match "property: " pattern typical in NestJS validation errors
  return error.replace(/^\w+:\s*/, '');
};

export const formatApiErrors = (error: any): string[] => {
  if (!error) return ['An error occurred'];

  // If it's an ApiError with data
  if (error.data && Array.isArray(error.data.message)) {
    return error.data.message.map((msg: string) => formatErrorAttributes(msg));
  }

  // If message itself is an array
  if (Array.isArray(error.message)) {
    return error.message.map((msg: string) => formatErrorAttributes(msg));
  }

  // Fallback string
  return [formatErrorAttributes(error.message || 'An error occurred')];
};
