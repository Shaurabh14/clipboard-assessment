const crypto = require("crypto");
const hash = (val) => {
  if (!val) return;
  return crypto.createHash("sha3-512").update(val).digest("hex");
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  candidate = event?.partitionKey
    ? event.partitionKey
    : hash(JSON.stringify(event));

  candidate = candidate
    ? typeof candidate !== "string"
      ? (candidate = JSON.stringify(candidate))
      : candidate
    : (candidate = TRIVIAL_PARTITION_KEY);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) candidate = hash(candidate);

  return candidate;
};
