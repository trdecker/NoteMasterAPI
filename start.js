const { spawn } = require('child_process')

// Start the server application as a child process
const serverProcess = spawn('node', ['app.js'])

serverProcess.stdout.on('data', (data) => {
    console.log(`Server output: ${data}`)
})

serverProcess.stderr.on('data', (data) => {
    console.error(`Server error: ${data}`)
})

serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`)
})
