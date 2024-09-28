#!/bin/bash

# Fail the action if any command fails
set -e

# Input parameter for OpenSSL version, defaulting to openssl@3
OPENSSL_VERSION="${1:-openssl@3}"

# Install OpenSSL via Homebrew
echo "Installing ${OPENSSL_VERSION} via Homebrew..."
brew install $OPENSSL_VERSION

# Setup environment variables
echo "Setting up environment for ${OPENSSL_VERSION}"
{
  echo "PATH=$(brew --prefix ${OPENSSL_VERSION})/bin:$PATH"
  echo "PKG_CONFIG_PATH=$(brew --prefix ${OPENSSL_VERSION})/lib/pkgconfig"
  echo "CPPFLAGS=-I$(brew --prefix ${OPENSSL_VERSION})/include"
  echo "LDFLAGS=-L$(brew --prefix ${OPENSSL_VERSION})/lib"
} >> $GITHUB_ENV

echo "OpenSSL environment setup completed."
