export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;
export const USERS_URL = SERVER_URL + "/api/v1/users";
export const DOCS_URL = SERVER_URL + "/api/v1/documents";
export const AUDITLOG = SERVER_URL + "/api/v1/auditLogs";
export const IMAGES_URL = SERVER_URL + "/images";

export const roleName = {
    User: 'user',
    Admin: 'admin',
    Manager: 'manager',
}