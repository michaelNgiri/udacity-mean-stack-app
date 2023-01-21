// import { UpdateResult } from 'mongoose';
export interface DataResponse {
	data?: Record<string, unknown> | unknown
	msg: string,
	status: number,
	success?: boolean,
	error?: Error
}

export interface UserInterface {
	id:string,
	firstName: string,
	lastName: string,
	email: string,
	phone: string
	password: string
}
