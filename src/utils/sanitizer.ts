export function sanitizeUserResponse(user: any, token?: string) {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    ...(token ? { accessToken: token } : {}),
  };
}

export function sanitizeTaskResponse(task: any) {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    createdAt: task.createdAt,
  };
}
