const { execSync } = require('child_process')
const core = require('@actions/core')

try {
  const version = core.getInput('version') || 'openssl@3'

  // Install OpenSSL
  execSync(`brew install ${version}`, { stdio: 'inherit' })

  // Set environment variables
  execSync(`echo "PATH=$(brew --prefix ${version})/bin:$PATH" >> $GITHUB_ENV`, {
    stdio: 'inherit'
  })
  execSync(
    `echo "PKG_CONFIG_PATH=$(brew --prefix ${version})/lib/pkgconfig" >> $GITHUB_ENV`,
    { stdio: 'inherit' }
  )
  execSync(
    `echo "CPPFLAGS=-I$(brew --prefix ${version})/include" >> $GITHUB_ENV`,
    { stdio: 'inherit' }
  )
  execSync(`echo "LDFLAGS=-L$(brew --prefix ${version})/lib" >> $GITHUB_ENV`, {
    stdio: 'inherit'
  })

  console.log('OpenSSL environment setup done.')
} catch (error) {
  core.setFailed(error.message)
}
