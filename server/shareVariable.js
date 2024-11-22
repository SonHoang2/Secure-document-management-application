import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const documentStatus = {
    Pending: 'pending',
    Approved: 'approved',
    Rejected: 'rejected'
};

export const permissionAction = {
    Read: 'read',
    Modify: 'modify',
};

export const roleName = {
    User: 'user',
    Admin: 'admin',
    Manager: 'manager',
}

export const auditLogAction = {
    Read: 'read',
    Modified: 'modified',
    Created: 'created',
    Deleted: 'deleted',
    Approved: 'approved',
    Rejected: 'rejected',
}