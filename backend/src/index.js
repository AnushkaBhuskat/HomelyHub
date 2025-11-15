import a3a from 'express';
import a3b from 'cors';
import dotenv from 'dotenv';
import a3c from 'cookie-parser';
import a3d from './utils/db.js';
import { router } from './routes/userRoutes.js';
import { propertyRouter } from './routes/propertyRouter.js';
import { bookingRouter } from './routes/bookingRouter.js';

dotenv.config();

const app = a3a();

// CORS for frontend
app.use(a3b({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true
}));

// Body parsers
app.use(a3a.json({ limit: '100mb' }));
app.use(a3a.urlencoded({ limit: '100mb', extended: true }));

// Cookie parser
app.use(a3c());

// Connect to MongoDB
a3d();

// Routes
app.use('/api/v1/rent/user', router);
app.use('/api/v1/rent/listing', propertyRouter);
app.use('/api/v1/rent/user/booking', bookingRouter);

// Export app for Vercel
export default app;

// Only listen locally (for development)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 8081;
    app.listen(port, () => {
        console.log('App running on port: ' + port);
    });
}
