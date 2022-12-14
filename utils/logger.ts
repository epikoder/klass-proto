export default function logger(error: any, key?: string) {
	if (process.env.APP_ENV === "" || process.env.APP_ENV === 'production' || process.env.LOG) return;
	console.log(`=================== ${key ?? 'LOG'} ========================`)
	console.log(error)
	console.log("=============================================================")
}