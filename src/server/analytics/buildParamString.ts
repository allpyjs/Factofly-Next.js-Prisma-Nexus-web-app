export default function buildParamString(obj: any) {
  return Object.keys(obj)
    .map((p) => `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`)
    .join('&');
}
