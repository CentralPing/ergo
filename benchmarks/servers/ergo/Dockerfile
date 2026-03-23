FROM node:22-alpine
RUN apk add --no-cache git
WORKDIR /app

# Copy local source packages as subdirectories of /app so that Node's
# upward node_modules search from /app/packages/*/lib/ reaches /app/node_modules/.
COPY packages/ergo packages/ergo
COPY packages/ergo-router packages/ergo-router

# The app declares both ergo packages as file: deps. A single npm install
# hoists all transitive deps (find-my-way, ajv, etag, etc.) into /app/node_modules/,
# which is reachable from /app/packages/ergo-router/lib/ via upward resolution.
COPY package.json .
RUN npm install --omit=dev --legacy-peer-deps

COPY server.js .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]
