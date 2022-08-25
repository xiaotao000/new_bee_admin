import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

export default (key: string) => {
	const config: PersistedStateOptions = {
		key,
		storage: localStorage
	}
	return config
}
