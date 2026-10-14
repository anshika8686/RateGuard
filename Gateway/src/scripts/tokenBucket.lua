
local bucketKey = KEYS[1]
-- creation of redis hash

local capacity = tonumber(ARGV[1])
local refillRate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
-- current timestamp
local ttl = tonumber(ARGV[4])
-- timeout


local bucket = redis.call("HMGET", bucketKey, "tokens", "lastRefillTs")
-- Reads both the feilds from the bucket
-- bucket -> tokens and lastRefillTs

local tokens = tonumber(bucket[1])
local lastRefillTs = tonumber(bucket[2])

-- creation of new bucket
if tokens == nil or lastRefillTs == nil then
    tokens = capacity
    lastRefillTs = now
end


-- Calculate elapsed time in seconds
local elapsed = math.max(0, (now - lastRefillTs) / 1000)

-- Refill tokens without exceeding capacity
tokens = math.min(capacity, tokens + elapsed * refillRate)


-- Check whether the request can be allowed
local allowed = 0 --rejected

if tokens >= 1 then
    tokens = tokens - 1
    allowed = 1 --allowed
end




-- Save the updated bucket state in Redis
redis.call(
    "HSET",
    bucketKey,
    "tokens", tokens,
    "lastRefillTs", now
)

-- Set bucket expiration in seconds
redis.call("EXPIRE", bucketKey, ttl)

return {allowed, math.floor(tokens)}