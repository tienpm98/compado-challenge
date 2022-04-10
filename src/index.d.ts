declare module 'redux-actions' {
	// createAction
	type PayloadTypes<Type> = Promise<Type> | ((state: any) => Type) | Type
	export interface Action<ActionName extends string, PayloadType, MetaType> {
		type: ActionName
		payload: PayloadTypes<PayloadType>
		meta: MetaType
	}
	type PayloadCreator<PayloadType> = (
		...args: any[]
	) => PayloadTypes<PayloadType>
	type MetaCreator<MetaType> = (...args: any[]) => MetaType
	interface ActionCreator<
		ActionName extends string,
		PC extends PayloadCreator<any> | null,
		MC extends MetaCreator<any> | null
	> {
		toString: () => ActionName
		(
			...args: PC extends PayloadCreator<any> ? Parameters<PC> : never[]
		): Action<
			ActionName,
			PC extends PayloadCreator<infer T> ? T : never,
			MC extends MetaCreator<infer U> ? U : never
		>
	}
	export function createAction<
		ActionName extends string,
		PC extends PayloadCreator<any> | null = null,
		MC extends MetaCreator<any> | null = null
	>(
		type: ActionName,
		payloadCreator?: PC,
		metaCreator?: MC
	): ActionCreator<ActionName, PC, MC>
	type InferPayloadType<T extends PayloadTypes<any>> = T extends PayloadTypes<
		infer U
	>
		? U
		: never
	export interface ActionType<T extends ActionCreator<string, any, any>> {
		type: ReturnType<T>['type']
		payload: InferPayloadType<ReturnType<T>['payload']>
		meta: ReturnType<T>['meta']
	}
	// handleActions
	type ActionHandler<State, ActionName extends string> = (
		state: State,
		action: ActionType<ActionCreator<ActionName, any, any>>
	) => State
	export function handleActions<State, ActionTypes extends string>(
		actionHandlers: {
			[key in ActionTypes]: ActionHandler<State, key>
		},
		defaultState: State
	): (state: State, action: Action<string, any, any>) => State
}
