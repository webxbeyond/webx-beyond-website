# ============================
# 1️⃣ Dependencies Stage
# ============================
FROM node:20-alpine AS deps
WORKDIR /webx-beyond

RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml source.config.ts ./
RUN pnpm install --frozen-lockfile

# ============================
# 2️⃣ Build Stage
# ============================
FROM deps AS builder
WORKDIR /webx-beyond

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
# Build standalone app
RUN pnpm build

# ============================
# 3️⃣ Production Stage
# ============================
FROM node:20-alpine AS runner
WORKDIR /webx-beyond

ENV NODE_ENV=production

# Copy standalone output and node_modules
COPY --from=builder /webx-beyond/.next/standalone ./
COPY --from=builder /webx-beyond/.next/static ./.next/static
COPY --from=builder /webx-beyond/public ./public
COPY --from=builder /webx-beyond/node_modules ./node_modules

EXPOSE 7020
ENV PORT=7020

CMD ["node", "server.js"]


# how to build

# docker build \
#   --build-arg NEXT_PUBLIC_ALGOLIA_APP_ID=yourAppId \
#   --build-arg NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=yourSearchKey \
#   --build-arg NEXT_PUBLIC_ALGOLIA_WRITE_API_KEY=yourWriteKey \
#   --build-arg NEXT_PUBLIC_ALGOLIA_INDEX_NAME=yourIndexName \
#   -t webx-beyond .