module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.SECRET_KEY,
  database: process.env.DB_NAME,
  define: {
    timestamps: false,
  },
  logging: false
}
