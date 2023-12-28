import { Router, Response } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 201, message);
	}

	public deleted<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 204, message);
	}

	public badRequest<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 400, message);
	}

	public notFound<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 404, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[BaseController]: created controller: [${route.method}] ${route.path}`);
			const middlewares = route.middlewares?.map((m) => m.exec.bind(m));
			const handler = route.func.bind(this);
			const pipeline = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeline);
		}
	}
}

export { BaseController };
