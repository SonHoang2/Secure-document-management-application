import catchAsync from '../utils/catchAsync.js';
import { query } from '../utils/filter.js';
import AuditLog from '../models/auditLogModel.js';
import User from '../models/userModel.js';
import Document from '../models/documentModel.js';

export const getAllAuditLogs = catchAsync(async (req, res) => {
    const { page, limit, sort, fields } = query(req);

    const auditLogs = await AuditLog.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        order: sort,
        attributes: fields,
        include: [
            {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            {
                model: Document,
                attributes: ['title', 'type']
            }
        ]
    });
    res.status(200).json({
        status: 'success',
        total: auditLogs.count,
        data: {
            auditLogs: auditLogs.rows
        }
    });
});