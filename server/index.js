const path = require('path')
const fastify = require('fastify')({ logger: true })
const fileUpload = require('fastify-file-upload')

const publicFolder = path.join(__dirname, 'public')

fastify.register(require('@fastify/static'), {
  root: publicFolder,
})

fastify.register(fileUpload)

fastify.post('/upload', function (req, reply) {
  // some code to handle file
  const files = req.raw.files
  const fileToUpload = files.fileToUpload
  const csv = Buffer.from(fileToUpload.data, 'base64').toString('utf-8')
  console.log(csv)
  const people = csv
    .split('\n')
    .slice(1)
    .filter(Boolean)
    .map((line) => line.split(','))
    .map((words) => {
      return {
        first: words[0],
        last: words[1],
        age: Number(words[2]),
      }
    })

  const html = `
    <body>
      <h1>Uploaded file</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>First</th>
              <th>Last</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            ${people
              .map(
                (person) => `
              <tr>
                <td>${person.first}</td>
                <td>${person.last}</td>
                <td>${person.age}</td>
              </tr>
            `,
              )
              .join('')}
          </tbody>
      </div>
    </body>
  `

  reply.type('text/html').send(html)
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
