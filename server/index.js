const path = require('path')
const fastify = require('fastify')({ logger: true })
const publicFolder = path.join(__dirname, 'public')

fastify.register(require('fastify-static'), {
  root: publicFolder,
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(4600)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
