# ---- builder ----
FROM node:20-alpine AS builder
WORKDIR /webx-beyond

# Install build dependencies (for native modules)
RUN apk add --no-cache --virtual .build-deps python3 make g++

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifest files first for caching
COPY package.json pnpm-lock.yaml source.config.ts next-pwa.config.mjs ./

# Install all dependencies (including dev) for build
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Pass build args
# Define multiple build arguments
ARG NEXT_PUBLIC_ALGOLIA_APP_ID
ARG NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
ARG NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
ARG NEXT_PUBLIC_ALGOLIA_INDEX_NAME

# Set envs for build stage
ENV NEXT_PUBLIC_ALGOLIA_APP_ID=$NEXT_PUBLIC_ALGOLIA_APP_ID
ENV NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=$NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
ENV NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY=$NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY
ENV NEXT_PUBLIC_ALGOLIA_INDEX_NAME=$NEXT_PUBLIC_ALGOLIA_INDEX_NAME


ENV NODE_OPTIONS="--max-old-space-size=8192"

# Build Next.js app
RUN pnpm build

# Prune dev dependencies for production
RUN pnpm prune --prod

# Remove build deps
RUN apk del .build-deps


# ---- runtime ----
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /webx-beyond

# Copy only what's needed to run
COPY --from=builder /webx-beyond/node_modules ./node_modules
COPY --from=builder /webx-beyond/.next ./.next
COPY --from=builder /webx-beyond/public ./public
COPY --from=builder /webx-beyond/package.json ./package.json
COPY --from=builder /webx-beyond/next.config.mjs ./next.config.mjs
COPY --from=builder /webx-beyond/next-pwa.config.mjs ./next-pwa.config.mjs

EXPOSE 7020
ENV PORT=7020

# Start Next.js app
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "7020"]



# # docker build \
# #   --build-arg NEXT_PUBLIC_ALGOLIA_APP_ID=yourAppId \
# #   --build-arg NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=yourSearchKey \
# #   --build-arg NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY=yourWriteKey \
# #   --build-arg NEXT_PUBLIC_ALGOLIA_INDEX_NAME=yourIndexName \
# #   -t webx-beyond .