import {z} from 'zod';
const common={name:z.string().trim().min(2).max(100),mobile:z.string().regex(/^[6-9]\d{9}$/),consent:z.literal(true),website:z.string().max(0).optional()};
export const letterSchema=z.object({...common,subject:z.string().trim().min(2).max(160),message:z.string().trim().min(10).max(5000)});
export const grievanceSchema=z.object({...common,district:z.string().trim().min(2).max(100),category:z.enum(['education','health','employment','land','police','other']),details:z.string().trim().min(10).max(5000),attachment:z.string().optional()});
export const memberSchema=z.object({...common,dob:z.string().refine(v=>!Number.isNaN(Date.parse(v))),gender:z.string().max(40).optional(),district:z.string().trim().min(2).max(100),address:z.string().trim().min(5).max(500)});
