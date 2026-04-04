"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUserResponse = sanitizeUserResponse;
exports.sanitizeTaskResponse = sanitizeTaskResponse;
function sanitizeUserResponse(user, token) {
    return Object.assign({ id: user.id, email: user.email, createdAt: user.createdAt }, (token ? { accessToken: token } : {}));
}
function sanitizeTaskResponse(task) {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
    };
}
