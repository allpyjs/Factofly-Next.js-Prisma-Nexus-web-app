export default function isServer() {
  return global.window === undefined;
}
