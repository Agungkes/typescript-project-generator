const writeFile = require('../utils/writeFile')

module.exports = async (
  author,
  projectName,
  projectDescription,
  projectVersion,
  license,
  ) => {
  const data = {
    content    : '',
    file       : 'package.json'
  }

  data.content = `{
  "name": "${projectName.toLowerCase().replace(/ /g, '-')}",
  "version": "${projectVersion}",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "description": "${projectDescription}",
  "scripts": {
    "compile": "tsc",
    "clean": "gts clean",
    "lint": "gts lint src/* --ext .ts --fix",
    "service": "nodemon",
    "test": "npx run pretest && jest --config jest.config.js && npx run posttest",
    "start": "node dist/index.js",
    "prepublishOnly": "npx run test && npx run compile",
    "pretest": "npx run compile",
    "posttest": "npx run lint",
    "preversion": "npx run lint",
    "postversion": "npx conventional-changelog-cli -p angular --release-count 0 --commit-path $PWD --pkg $PWD/package.json --outfile $PWD/CHANGELOG.md && git add CHANGELOG.md"
  },
  "publishConfig": {
    "access": "public"
  },
  "author": "${author}",
  "license": "${license.toUpperCase()}",
  "dependencies": {},
  "devDependencies": {},
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "prepare-commit-msg": "exec < /dev/tty && git cz --hook || true",
      "pre-commit": "lint-staged",
      "commit-msg": "npx --no-install commitlint --edit $1"
    }
  },
  "lint-staged": {
    "*!(*test).{js,jsx,ts,tsx}": [
      "npm run lint"
    ],
    "*.{js,css,md}": "prettier --write"
  }
}
`
  await writeFile(data.file, data.content)
}