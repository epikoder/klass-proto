import mysql from 'mysql'
import util from 'util'

var _conn: mysql.Connection | undefined = undefined

const conn = (function (): mysql.Connection {
	if (_conn === undefined) {
		_conn = mysql.createConnection({
			host: process.env.MYSQL_HOST ?? "localhost",
			port: parseInt(process.env.MYSQL_PORT ?? "3306"),
			database: process.env.MYSQL_DATABASE,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
		})
		_conn.connect(err => {
			if (err) throw err
		})
	}
	return _conn
})

const query = () => util.promisify(conn().query).bind(conn())
export { query }
export default conn