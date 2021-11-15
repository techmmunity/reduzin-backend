import { RouteOutput } from "./route";

export interface Response {
	redirect: (url: string) => RouteOutput;
}
