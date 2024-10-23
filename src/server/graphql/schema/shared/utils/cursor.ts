export const CURSOR_PREFIX = 'cursor:';

function base64Decode(str: string): string {
  return Buffer.from(str, 'base64').toString('utf8');
}

export function getInfoFromDecodedCursor(cursor: string): { id: number | bigint; index: number | undefined } {
  const [indexRaw, id] = cursor.split(':');
  const index = indexRaw ? parseInt(indexRaw, 10) : undefined;

  return { id: Number(id), index };
}

export function getInfoFromCursor(cursor: string): { id: number | bigint; index: number | undefined } {
  const decoded = base64Decode(cursor).replace(CURSOR_PREFIX, '');

  return getInfoFromDecodedCursor(decoded);
}

export function cursorFromNode(
  node: { id: string } | null,
  { after }: { after?: string | null },
  context: unknown,
  info: unknown,
  { index }: { index: number }
): string {
  const afterIndex = (after && getInfoFromDecodedCursor(after).index) || 0;
  return `${CURSOR_PREFIX}${afterIndex + index + 1}:${node?.id}`;
}
