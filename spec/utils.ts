export const WAIT_FOR_TIMEOUT = 2000

export function listenTo(event: string) {
  const requests: unknown[] = []
  window.nostojs(api => api.listen(event, req => requests.push(req)))
  return requests
}