const NS_TO_MS = 1e6;

export default function durationInMs(start: bigint, end: bigint) {
  return (end - start) / BigInt(NS_TO_MS);
}
