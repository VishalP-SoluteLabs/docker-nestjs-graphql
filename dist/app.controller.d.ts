import { AppResolver } from './app.resolver';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppResolver);
    getHello(): string;
}
