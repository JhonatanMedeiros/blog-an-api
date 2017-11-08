module.exports = {
    // Secret key for JWT signing and encryption
    'secret': 'super secret passphrase',
    // Database connection information
    // 'database': 'mongodb://localhost:27017/blog-database',
    'database': 'mongodb://jhonatan:minhasenha123@ds249605.mlab.com:49605/db_blog_an',
    // Setting port for server
    'port': process.env.PORT || 5000
}